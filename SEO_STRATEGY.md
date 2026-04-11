# Equivie MED — SEO & Technical Strategy

## Why This Matters More Than Usual

This site falls under Google's **YMYL (Your Money or Your Life)** classification because it covers menopause and women's health. Google applies significantly higher scrutiny to YMYL pages. Every technical decision must clear a higher bar than a typical informational site.

Additionally, **2026 SEO serves two ecosystems simultaneously**: traditional search (Google, Bing) and AI search engines (Google AI Overviews, Perplexity, ChatGPT Search) that crawl and cite websites directly. The technical foundation must work for both.

## Architecture Decisions

### Current Stack
- React 19 + Vite 8 + Tailwind CSS v4 (client-side rendered SPA)
- React Router v6 for routing
- Deployed on Vercel (forher-ashy.vercel.app, production domain TBD)
- No SSR/SSG — pure CSR with single index.html entry point

### Domain Strategy (Future)
- `equivimed.ch` — primary domain for Swiss market (ccTLD = strongest geo signal)
- `equivimed.com` — international/English domain
- URL structure: `/de/`, `/fr/`, `/en/` language subdirectories
- hreflang: `de-CH`, `fr-CH`, `en` with bidirectional tags

### SEO Limitations of Current Architecture
The SPA architecture means:
- All pages share one static `<title>` and `<meta description>` from index.html
- No per-page OG images or structured data visible to crawlers without JS execution
- Google can render JS but it's slower and less reliable than static HTML
- AI search crawlers may not execute JS at all

### Future Migration Path
When ready to move to SSR/SSG (Next.js or Astro), prioritize:
1. Per-page metadata (title, description, OG, canonical)
2. Static generation for all public pages (ISR for blog)
3. Automatic sitemap generation
4. Edge-rendered hreflang tags

## Content & E-E-A-T Requirements (YMYL)

For health/medical content, Google evaluates:
- **Experience**: Real patient testimonials, practitioner bios
- **Expertise**: FMH credentials, menopause specialization
- **Authoritativeness**: Medical review dates, cited sources
- **Trustworthiness**: Swiss regulation compliance, contact info, legal pages

Every article/page should display:
- Author name + credentials
- Medical review date (`lastReviewed`)
- Sources/references
- Clear disclaimers

## Structured Data Priority

1. **Organization** — homepage (name, url, logo, contact)
2. **MedicalBusiness** — service pages (medical specialty, insurance, location)
3. **FAQPage** — FAQ sections (eligible for rich results on health sites)
4. **MedicalWebPage** — health articles (reviewedBy, lastReviewed, about: MedicalCondition)
5. **Article/BlogPosting** — blog posts (author, datePublished, dateModified)
6. **BreadcrumbList** — all pages with navigation depth

## Core Web Vitals Targets

| Metric | Target | Current Risk |
|--------|--------|-------------|
| LCP | < 2.0s | Font loading (Google Fonts), no preconnect |
| CLS | < 0.1 | Images without width/height, font swap |
| INP | < 200ms | Single JS bundle, no code splitting |

## Implementation Checklist

### Phase 1: Critical Fixes (Before Launch)
- [x] robots.txt
- [x] sitemap.xml
- [x] OG + Twitter meta tags in index.html
- [x] Canonical tag
- [x] Font preconnect
- [x] Structured data (Organization, FAQPage)
- [x] 404 page
- [x] Fix empty alt text on blog images
- [x] Image lazy loading
- [x] noindex on staging/preview deployments

### Phase 2: Optimization
- [ ] Per-page meta tags (requires react-helmet or SSR migration)
- [ ] hreflang implementation (requires production domains)
- [ ] Code splitting / lazy routes
- [ ] Image format optimization (WebP/AVIF)
- [ ] MedicalWebPage schema on articles
- [ ] BlogPosting schema on blog posts
- [ ] BreadcrumbList schema
- [ ] Accessibility audit (ARIA labels, keyboard navigation)

### Phase 3: Production Domains
- [ ] Set up equivimed.ch + equivimed.com
- [ ] Configure hreflang with region codes (de-CH, fr-CH, en)
- [ ] Submit sitemaps to Google Search Console + Bing
- [ ] Verify structured data in Rich Results Test
- [ ] Run Screaming Frog crawl for broken links
- [ ] Test Core Web Vitals on mobile via PageSpeed Insights
