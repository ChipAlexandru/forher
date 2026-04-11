/**
 * Post-build pre-rendering script.
 *
 * After `vite build` produces `dist/`, this script:
 *   1. Spins up a local static server serving `dist/`
 *   2. Uses Puppeteer to visit each route
 *   3. Waits for lazy components and react-helmet-async meta tags to render
 *   4. Captures the final HTML and writes it to the appropriate path in `dist/`
 *
 * Routes to pre-render are: /, /blog, and every /blog/:slug from articles data.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');
const PORT = 4173;

// ---------------------------------------------------------------------------
// 1. Discover routes
// ---------------------------------------------------------------------------

async function getRoutes() {
  // Static routes
  const routes = ['/', '/blog'];

  // Dynamic blog routes from articles data.
  // We import the built JS to extract slugs. Since the source is ESM with no
  // JSX, we can read the source file directly and extract slugs with a regex.
  const articlesPath = join(__dirname, '..', 'src', 'data', 'articles.js');
  const articlesSource = readFileSync(articlesPath, 'utf-8');
  const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = slugRegex.exec(articlesSource)) !== null) {
    routes.push(`/blog/${match[1]}`);
  }

  return routes;
}

// ---------------------------------------------------------------------------
// 2. Static file server (serves dist/ with SPA fallback to index.html)
// ---------------------------------------------------------------------------

function startServer() {
  return new Promise((resolve) => {
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.svg': 'image/svg+xml',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.woff2': 'font/woff2',
      '.woff': 'font/woff',
    };

    const server = createServer((req, res) => {
      let filePath = join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);

      // SPA fallback: if the file doesn't exist, serve index.html
      if (!existsSync(filePath) || filePath.endsWith('/')) {
        filePath = join(DIST_DIR, 'index.html');
      }

      try {
        const data = readFileSync(filePath);
        const ext = '.' + filePath.split('.').pop();
        res.writeHead(200, {
          'Content-Type': mimeTypes[ext] || 'application/octet-stream',
        });
        res.end(data);
      } catch {
        // Final fallback
        const data = readFileSync(join(DIST_DIR, 'index.html'));
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });

    server.listen(PORT, () => {
      console.log(`  Static server running on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

// ---------------------------------------------------------------------------
// 3. Render a single route with Puppeteer
// ---------------------------------------------------------------------------

async function renderRoute(browser, route) {
  const page = await browser.newPage();
  const url = `http://localhost:${PORT}${route}`;

  await page.goto(url, { waitUntil: 'networkidle0' });

  // Wait for Suspense boundaries to resolve (lazy components).
  // We check that no fallback placeholder divs remain and that the page
  // has meaningful content beyond the empty root div.
  await page.waitForFunction(
    () => {
      const root = document.getElementById('root');
      if (!root) return false;
      // Wait until root has rendered children (not just the empty div)
      if (root.children.length === 0) return false;
      // Check that helmet has had a chance to run by looking for a title
      // or meta description in <head>
      const title = document.querySelector('title');
      return title && title.textContent.length > 0;
    },
    { timeout: 15000 },
  );

  // Small extra delay for any remaining async renders
  await new Promise((r) => setTimeout(r, 500));

  // Clean up duplicate <head> tags. react-helmet-async appends its tags
  // alongside the original static ones from index.html. We keep helmet's
  // versions (which appear later) and remove the earlier duplicates.
  await page.evaluate(() => {
    const head = document.head;

    // Deduplicate <title> — keep only the first one (helmet places its own first)
    const titles = head.querySelectorAll('title');
    if (titles.length > 1) {
      // Keep the first title (helmet's), remove the rest
      for (let i = 1; i < titles.length; i++) titles[i].remove();
    }

    // Deduplicate meta tags by name or property attribute
    const seen = new Map();
    const metas = head.querySelectorAll('meta[name], meta[property]');
    // Iterate in reverse so we keep the LAST occurrence (helmet's)
    for (let i = metas.length - 1; i >= 0; i--) {
      const key = metas[i].getAttribute('name') || metas[i].getAttribute('property');
      if (seen.has(key)) {
        metas[i].remove();
      } else {
        seen.set(key, true);
      }
    }

    // Deduplicate link[rel="canonical"]
    const canonicals = head.querySelectorAll('link[rel="canonical"]');
    if (canonicals.length > 1) {
      for (let i = 0; i < canonicals.length - 1; i++) canonicals[i].remove();
    }
  });

  let html = await page.content();

  // Remove any Vite HMR / dev-only scripts (shouldn't exist in prod, but safe)
  html = html.replace(/<script[^>]*type="module"[^>]*src="[^"]*@vite[^"]*"[^>]*><\/script>/g, '');

  await page.close();
  return html;
}

// ---------------------------------------------------------------------------
// 4. Write rendered HTML to dist
// ---------------------------------------------------------------------------

function writeRoute(route, html) {
  let outPath;
  if (route === '/') {
    outPath = join(DIST_DIR, 'index.html');
  } else {
    // e.g. /blog -> dist/blog/index.html
    // e.g. /blog/my-slug -> dist/blog/my-slug/index.html
    const dir = join(DIST_DIR, route.slice(1));
    mkdirSync(dir, { recursive: true });
    outPath = join(dir, 'index.html');
  }
  writeFileSync(outPath, html, 'utf-8');
  console.log(`  Written: ${outPath.replace(DIST_DIR, 'dist')}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('\n[prerender] Discovering routes...');
  const routes = await getRoutes();
  console.log(`[prerender] Found ${routes.length} routes to pre-render:`);
  routes.forEach((r) => console.log(`  - ${r}`));

  console.log('\n[prerender] Starting static server...');
  const server = await startServer();

  console.log('[prerender] Launching Puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  console.log('[prerender] Rendering routes...\n');
  for (const route of routes) {
    try {
      console.log(`  Rendering ${route}...`);
      const html = await renderRoute(browser, route);
      writeRoute(route, html);
    } catch (err) {
      console.error(`  ERROR rendering ${route}: ${err.message}`);
    }
  }

  console.log('\n[prerender] Cleaning up...');
  await browser.close();
  server.close();
  console.log('[prerender] Done!\n');
}

main().catch((err) => {
  console.error('[prerender] Fatal error:', err);
  process.exit(1);
});
