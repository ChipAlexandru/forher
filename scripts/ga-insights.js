/**
 * Equivie MED — GA4 Analytics Insights Script
 *
 * Pulls data from Google Analytics Data API and generates
 * an actionable insight report.
 *
 * Usage: node scripts/ga-insights.js [--days 30]
 */

import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { google } from 'googleapis';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// --- Config ---
const PROPERTY_ID = '532551574';
const SITE_URL = 'sc-domain:equiviemed.ch';
const CREDENTIALS_PATH = resolve(ROOT, 'ga-credentials.json');
const OUTPUT_PATH = resolve(ROOT, 'analytics-report.md');

const daysArg = process.argv.find((a, i) => process.argv[i - 1] === '--days');
const DAYS = parseInt(daysArg) || 30;

// --- Audience filtering ---
// By default, filter to the Swiss Target Market (CH/DE/FR/AT/IT/LI) to exclude
// the bot-heavy US/Russia/Asia traffic that dominates raw data. Pass --all to
// see unfiltered numbers.
const ALL_TRAFFIC = process.argv.includes('--all');
const TARGET_COUNTRIES = ['Switzerland', 'Germany', 'France', 'Austria', 'Italy', 'Liechtenstein'];

function buildCountryFilter() {
  if (ALL_TRAFFIC) return undefined;
  return {
    filter: {
      fieldName: 'country',
      inListFilter: { values: TARGET_COUNTRIES },
    },
  };
}

// --- Init clients ---
const credentials = JSON.parse(readFileSync(CREDENTIALS_PATH, 'utf-8'));
const client = new BetaAnalyticsDataClient({
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  },
});

const scAuth = new google.auth.JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
});
const searchConsole = google.searchconsole({ version: 'v1', auth: scAuth });

const property = `properties/${PROPERTY_ID}`;

// --- Date helpers ---
function daysAgoIso(d) {
  const date = new Date();
  date.setDate(date.getDate() - d);
  return date.toISOString().slice(0, 10);
}

// --- Helpers ---
function num(row, i = 0) {
  return parseInt(row.metricValues[i]?.value || '0');
}
function dim(row, i = 0) {
  return row.dimensionValues[i]?.value || '(not set)';
}
function pct(n, total) {
  return total ? ((n / total) * 100).toFixed(1) + '%' : '0%';
}
function fmt(n) {
  return n.toLocaleString('en-US');
}
function avgSec(row, i = 0) {
  const val = parseFloat(row.metricValues[i]?.value || '0');
  return Math.round(val);
}

// --- Queries ---
async function getOverview() {
  const [res] = await client.runReport({
    property,
    dateRanges: [{ startDate: `${DAYS}daysAgo`, endDate: 'today' }],
    metrics: [
      { name: 'totalUsers' },
      { name: 'sessions' },
      { name: 'screenPageViews' },
      { name: 'averageSessionDuration' },
      { name: 'bounceRate' },
      { name: 'newUsers' },
    ],
    dimensionFilter: buildCountryFilter(),
  });
  const r = res.rows?.[0];
  if (!r) return null;
  return {
    users: num(r, 0),
    sessions: num(r, 1),
    pageviews: num(r, 2),
    avgDuration: avgSec(r, 3),
    bounceRate: (parseFloat(r.metricValues[4]?.value || 0) * 100).toFixed(1),
    newUsers: num(r, 5),
  };
}

async function getTopPages() {
  const [res] = await client.runReport({
    property,
    dateRanges: [{ startDate: `${DAYS}daysAgo`, endDate: 'today' }],
    dimensions: [{ name: 'pagePath' }],
    metrics: [
      { name: 'screenPageViews' },
      { name: 'averageSessionDuration' },
      { name: 'bounceRate' },
    ],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 20,
    dimensionFilter: buildCountryFilter(),
  });
  return (res.rows || []).map((r) => ({
    path: dim(r),
    views: num(r, 0),
    avgDuration: avgSec(r, 1),
    bounceRate: (parseFloat(r.metricValues[2]?.value || 0) * 100).toFixed(1),
  }));
}

async function getTrafficSources() {
  const [res] = await client.runReport({
    property,
    dateRanges: [{ startDate: `${DAYS}daysAgo`, endDate: 'today' }],
    dimensions: [{ name: 'sessionDefaultChannelGroup' }],
    metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 10,
    dimensionFilter: buildCountryFilter(),
  });
  return (res.rows || []).map((r) => ({
    channel: dim(r),
    sessions: num(r, 0),
    users: num(r, 1),
  }));
}

async function getLanguageSplit() {
  const [res] = await client.runReport({
    property,
    dateRanges: [{ startDate: `${DAYS}daysAgo`, endDate: 'today' }],
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }, { name: 'totalUsers' }],
    dimensionFilter: buildCountryFilter(),
  });
  const langs = { de: { views: 0, users: 0 }, fr: { views: 0, users: 0 }, en: { views: 0, users: 0 }, other: { views: 0, users: 0 } };
  for (const r of res.rows || []) {
    const path = dim(r);
    const views = num(r, 0);
    const users = num(r, 1);
    if (path.startsWith('/de')) { langs.de.views += views; langs.de.users += users; }
    else if (path.startsWith('/fr')) { langs.fr.views += views; langs.fr.users += users; }
    else if (path.startsWith('/en')) { langs.en.views += views; langs.en.users += users; }
    else { langs.other.views += views; langs.other.users += users; }
  }
  return langs;
}

async function getDevices() {
  const [res] = await client.runReport({
    property,
    dateRanges: [{ startDate: `${DAYS}daysAgo`, endDate: 'today' }],
    dimensions: [{ name: 'deviceCategory' }],
    metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    dimensionFilter: buildCountryFilter(),
  });
  return (res.rows || []).map((r) => ({
    device: dim(r),
    sessions: num(r, 0),
    users: num(r, 1),
  }));
}

async function getCountries() {
  const [res] = await client.runReport({
    property,
    dateRanges: [{ startDate: `${DAYS}daysAgo`, endDate: 'today' }],
    dimensions: [{ name: 'country' }],
    metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 10,
  });
  return (res.rows || []).map((r) => ({
    country: dim(r),
    sessions: num(r, 0),
    users: num(r, 1),
  }));
}

async function getWaitlistEvents() {
  const [res] = await client.runReport({
    property,
    dateRanges: [{ startDate: `${DAYS}daysAgo`, endDate: 'today' }],
    dimensions: [{ name: 'eventName' }],
    metrics: [{ name: 'eventCount' }],
    dimensionFilter: {
      orGroup: {
        expressions: [
          { filter: { fieldName: 'eventName', stringFilter: { value: 'waitlist_modal_open' } } },
          { filter: { fieldName: 'eventName', stringFilter: { value: 'waitlist_signup' } } },
        ],
      },
    },
  });
  const events = { modal_opens: 0, signups: 0 };
  for (const r of res.rows || []) {
    const name = dim(r);
    if (name === 'waitlist_modal_open') events.modal_opens = num(r, 0);
    if (name === 'waitlist_signup') events.signups = num(r, 0);
  }
  return events;
}

async function getDailyTrend() {
  const [res] = await client.runReport({
    property,
    dimensionFilter: buildCountryFilter(),
    dateRanges: [{ startDate: `${DAYS}daysAgo`, endDate: 'today' }],
    dimensions: [{ name: 'date' }],
    metrics: [{ name: 'totalUsers' }, { name: 'sessions' }],
    orderBys: [{ dimension: { dimensionName: 'date' }, desc: false }],
  });
  return (res.rows || []).map((r) => ({
    date: dim(r).replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
    users: num(r, 0),
    sessions: num(r, 1),
  }));
}

// --- Search Console queries ---
async function getSearchQueries() {
  try {
    const res = await searchConsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: daysAgoIso(DAYS),
        endDate: daysAgoIso(0),
        dimensions: ['query'],
        rowLimit: 25,
      },
    });
    return (res.data.rows || []).map((r) => ({
      query: r.keys[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: (r.ctr * 100).toFixed(1),
      position: r.position.toFixed(1),
    }));
  } catch (err) {
    return { error: err.message };
  }
}

async function getSearchPages() {
  try {
    const res = await searchConsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: daysAgoIso(DAYS),
        endDate: daysAgoIso(0),
        dimensions: ['page'],
        rowLimit: 15,
      },
    });
    return (res.data.rows || []).map((r) => ({
      page: r.keys[0].replace('https://equiviemed.ch', ''),
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: (r.ctr * 100).toFixed(1),
      position: r.position.toFixed(1),
    }));
  } catch (err) {
    return { error: err.message };
  }
}

async function getSearchTotals() {
  try {
    const res = await searchConsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: daysAgoIso(DAYS),
        endDate: daysAgoIso(0),
      },
    });
    const row = res.data.rows?.[0];
    if (!row) return { clicks: 0, impressions: 0, ctr: 0, position: 0 };
    return {
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: (row.ctr * 100).toFixed(1),
      position: row.position.toFixed(1),
    };
  } catch (err) {
    return { error: err.message };
  }
}

// --- Generate report ---
async function main() {
  console.log(`Pulling GA4 data for the last ${DAYS} days...\n`);

  const [overview, pages, sources, langs, devices, countries, daily, waitlist, scTotals, scQueries, scPages] = await Promise.all([
    getOverview(),
    getTopPages(),
    getTrafficSources(),
    getLanguageSplit(),
    getDevices(),
    getCountries(),
    getDailyTrend(),
    getWaitlistEvents(),
    getSearchTotals(),
    getSearchQueries(),
    getSearchPages(),
  ]);

  if (!overview) {
    console.log('No data found for this period. The site may not have received traffic yet.');
    return;
  }

  const totalLangViews = langs.de.views + langs.fr.views + langs.en.views + langs.other.views;
  const totalSessions = sources.reduce((s, r) => s + r.sessions, 0);

  // --- Build markdown report ---
  let md = '';
  md += `# Equivie MED Analytics Report\n`;
  md += `**Period**: Last ${DAYS} days | **Generated**: ${new Date().toISOString().slice(0, 10)}\n`;
  if (ALL_TRAFFIC) {
    md += `**Filter**: ALL TRAFFIC (includes bots/non-target countries) — pass without --all to see filtered view\n\n`;
  } else {
    md += `**Filter**: Swiss Target Market only (CH, DE, FR, AT, IT, LI) — pass --all to see all traffic including bots\n\n`;
  }

  // Overview
  md += `## Overview\n`;
  md += `| Metric | Value |\n|--------|-------|\n`;
  md += `| Total Users | ${fmt(overview.users)} |\n`;
  md += `| New Users | ${fmt(overview.newUsers)} |\n`;
  md += `| Sessions | ${fmt(overview.sessions)} |\n`;
  md += `| Pageviews | ${fmt(overview.pageviews)} |\n`;
  md += `| Avg. Session Duration | ${overview.avgDuration}s |\n`;
  md += `| Bounce Rate | ${overview.bounceRate}% |\n\n`;

  // Language split
  md += `## Language Split\n`;
  md += `| Language | Pageviews | Share | Users |\n|----------|-----------|-------|-------|\n`;
  for (const [lang, data] of Object.entries(langs)) {
    if (data.views > 0) {
      md += `| ${lang.toUpperCase()} | ${fmt(data.views)} | ${pct(data.views, totalLangViews)} | ${fmt(data.users)} |\n`;
    }
  }
  md += '\n';

  // Top pages
  md += `## Top Pages\n`;
  md += `| Page | Views | Avg Duration | Bounce Rate |\n|------|-------|-------------|-------------|\n`;
  for (const p of pages.slice(0, 15)) {
    md += `| ${p.path} | ${fmt(p.views)} | ${p.avgDuration}s | ${p.bounceRate}% |\n`;
  }
  md += '\n';

  // Traffic sources
  // Waitlist funnel
  md += `## Waitlist Funnel\n`;
  md += `| Step | Count |\n|------|-------|\n`;
  md += `| Modal Opens | ${fmt(waitlist.modal_opens)} |\n`;
  md += `| Email Signups | ${fmt(waitlist.signups)} |\n`;
  const convRate = waitlist.modal_opens ? ((waitlist.signups / waitlist.modal_opens) * 100).toFixed(1) : '0.0';
  md += `| Conversion (open → signup) | ${convRate}% |\n`;
  md += `| Site → Modal Rate | ${overview.sessions ? ((waitlist.modal_opens / overview.sessions) * 100).toFixed(1) : '0.0'}% |\n\n`;

  md += `## Traffic Sources\n`;
  md += `| Channel | Sessions | Share | Users |\n|---------|----------|-------|-------|\n`;
  for (const s of sources) {
    md += `| ${s.channel} | ${fmt(s.sessions)} | ${pct(s.sessions, totalSessions)} | ${fmt(s.users)} |\n`;
  }
  md += '\n';

  // Devices
  // Search Console
  if (!scTotals.error) {
    md += `## Google Search Performance\n`;
    md += `| Metric | Value |\n|--------|-------|\n`;
    md += `| Total Clicks | ${fmt(scTotals.clicks || 0)} |\n`;
    md += `| Total Impressions | ${fmt(scTotals.impressions || 0)} |\n`;
    md += `| Average CTR | ${scTotals.ctr || 0}% |\n`;
    md += `| Average Position | ${scTotals.position || 0} |\n\n`;

    if (!scQueries.error && scQueries.length > 0) {
      md += `### Top Search Queries\n`;
      md += `| Query | Clicks | Impressions | CTR | Position |\n|-------|--------|-------------|-----|----------|\n`;
      for (const q of scQueries.slice(0, 15)) {
        md += `| ${q.query} | ${q.clicks} | ${q.impressions} | ${q.ctr}% | ${q.position} |\n`;
      }
      md += '\n';
    }

    if (!scPages.error && scPages.length > 0) {
      md += `### Top Search Landing Pages\n`;
      md += `| Page | Clicks | Impressions | CTR | Position |\n|------|--------|-------------|-----|----------|\n`;
      for (const p of scPages.slice(0, 10)) {
        md += `| ${p.page} | ${p.clicks} | ${p.impressions} | ${p.ctr}% | ${p.position} |\n`;
      }
      md += '\n';
    }
  } else {
    md += `## Google Search Performance\n`;
    md += `_No Search Console data yet. Data usually appears 2-3 days after the site is indexed._\n\n`;
  }

  md += `## Devices\n`;
  md += `| Device | Sessions | Users |\n|--------|----------|-------|\n`;
  for (const d of devices) {
    md += `| ${d.device} | ${fmt(d.sessions)} | ${fmt(d.users)} |\n`;
  }
  md += '\n';

  // Countries
  md += `## Top Countries\n`;
  md += `| Country | Sessions | Users |\n|---------|----------|-------|\n`;
  for (const c of countries) {
    md += `| ${c.country} | ${fmt(c.sessions)} | ${fmt(c.users)} |\n`;
  }
  md += '\n';

  // Daily trend (last 14 days)
  const recentDays = daily.slice(-14);
  md += `## Daily Trend (Last 14 Days)\n`;
  md += `| Date | Users | Sessions |\n|------|-------|----------|\n`;
  for (const d of recentDays) {
    md += `| ${d.date} | ${d.users} | ${d.sessions} |\n`;
  }
  md += '\n';

  // --- SO WHAT section ---
  md += `---\n\n`;
  md += `## So What — Key Insights\n\n`;

  // Language insight
  const dePct = totalLangViews ? (langs.de.views / totalLangViews * 100).toFixed(0) : 0;
  const frPct = totalLangViews ? (langs.fr.views / totalLangViews * 100).toFixed(0) : 0;
  const enPct = totalLangViews ? (langs.en.views / totalLangViews * 100).toFixed(0) : 0;
  md += `**1. Language demand**: DE ${dePct}% / FR ${frPct}% / EN ${enPct}% of pageviews. `;
  if (parseInt(dePct) > 60) md += `German dominates as expected for Swiss market. French content may be underexposed.\n\n`;
  else if (parseInt(frPct) > 30) md += `French has meaningful traction — consider prioritizing FR content expansion.\n\n`;
  else md += `Traffic is spread across languages — monitor which converts best to waitlist.\n\n`;

  // Bounce rate insight
  md += `**2. Engagement**: Bounce rate is ${overview.bounceRate}%. `;
  if (parseFloat(overview.bounceRate) > 70) md += `High bounce rate — users may not be finding what they need, or the landing page CTA isn't compelling enough. Consider testing different hero copy.\n\n`;
  else if (parseFloat(overview.bounceRate) > 50) md += `Moderate bounce rate — typical for content sites. Look at which pages have lowest bounce to understand what keeps users engaged.\n\n`;
  else md += `Low bounce rate — users are exploring the site. Good sign for content engagement.\n\n`;

  // Device insight
  const mobileRow = devices.find(d => d.device === 'mobile');
  const desktopRow = devices.find(d => d.device === 'desktop');
  const totalDeviceSessions = devices.reduce((s, d) => s + d.sessions, 0);
  if (mobileRow && totalDeviceSessions) {
    const mobilePct = (mobileRow.sessions / totalDeviceSessions * 100).toFixed(0);
    md += `**3. Device split**: ${mobilePct}% mobile. `;
    if (parseInt(mobilePct) > 60) md += `Majority mobile — your target audience (40-55 women) browses on phones. Ensure waitlist modal and article readability are flawless on mobile.\n\n`;
    else md += `Desktop-leaning — users may be researching during work hours. The employers/B2B page could resonate.\n\n`;
  }

  // Traffic source insight
  const organicRow = sources.find(s => s.channel.toLowerCase().includes('organic'));
  const directRow = sources.find(s => s.channel.toLowerCase().includes('direct'));
  if (organicRow && totalSessions) {
    const orgPct = (organicRow.sessions / totalSessions * 100).toFixed(0);
    md += `**4. Organic search**: ${orgPct}% of traffic. `;
    if (parseInt(orgPct) > 40) md += `Strong organic presence — SEO investment is paying off. Double down on top-performing article topics.\n\n`;
    else if (parseInt(orgPct) > 15) md += `Organic is building. Continue publishing and interlinking wissen articles. Expect 3-6 months for meaningful SEO compounding.\n\n`;
    else md += `Organic is still low — expected for a new site. Keep building content authority. Current traffic is likely referral/direct.\n\n`;
  }

  // Top content insight
  const wissenPages = pages.filter(p => p.path.includes('/wissen/'));
  if (wissenPages.length > 0) {
    const topArticle = wissenPages[0];
    md += `**5. Top content**: "${topArticle.path}" leads with ${fmt(topArticle.views)} views. `;
    md += `This topic has proven demand — consider expanding it with related sub-articles or promoting it in waitlist emails.\n\n`;
  }

  // Country insight
  const chRow = countries.find(c => c.country === 'Switzerland');
  if (chRow && totalSessions) {
    const chPct = (chRow.sessions / totalSessions * 100).toFixed(0);
    md += `**6. Swiss market**: ${chPct}% of sessions from Switzerland. `;
    if (parseInt(chPct) > 60) md += `Well-targeted. Local market is primary audience as intended.\n\n`;
    else md += `Consider whether non-Swiss traffic is valuable (brand awareness) or if you need to sharpen Swiss-specific targeting (local SEO, .ch domain authority).\n\n`;
  }

  // Waitlist funnel insight
  if (waitlist.modal_opens > 0) {
    md += `**7. Waitlist funnel**: ${fmt(waitlist.modal_opens)} modal opens → ${fmt(waitlist.signups)} signups (${convRate}% conversion). `;
    if (parseFloat(convRate) > 50) md += `Strong conversion — the modal copy resonates. Focus on driving more traffic to increase volume.\n\n`;
    else if (parseFloat(convRate) > 20) md += `Decent conversion. Test shorter copy or social proof in the modal to improve.\n\n`;
    else md += `Low conversion from open to signup — the modal may need a stronger value proposition or simpler form.\n\n`;
    const siteToModal = overview.sessions ? ((waitlist.modal_opens / overview.sessions) * 100).toFixed(0) : 0;
    md += `**8. CTA effectiveness**: ${siteToModal}% of sessions lead to a modal open. `;
    if (parseInt(siteToModal) > 15) md += `Good CTA visibility — users are finding and clicking the booking buttons.\n\n`;
    else md += `Low CTA engagement — consider making the booking button more prominent, adding it mid-page, or testing different copy.\n\n`;
  } else {
    md += `**7. Waitlist funnel**: No waitlist events tracked yet. Events will appear after the next deployment with GA4 tracking enabled.\n\n`;
  }

  // Search Console insight
  if (!scTotals.error && scTotals.impressions > 0) {
    md += `**9. Google visibility**: ${fmt(scTotals.impressions)} impressions, ${fmt(scTotals.clicks)} clicks, ${scTotals.ctr}% CTR, avg. position ${scTotals.position}. `;
    if (parseFloat(scTotals.position) < 10) md += `You're appearing on page 1 for some queries — great start. Focus on CTR optimisation (meta titles/descriptions).\n\n`;
    else if (parseFloat(scTotals.position) < 30) md += `You're appearing on pages 2-3 — build content depth and internal links to push rankings up.\n\n`;
    else md += `Low average position means Google is showing you for broad queries. Focus on long-tail Swiss menopause keywords where you can rank higher.\n\n`;

    if (!scQueries.error && scQueries.length > 0) {
      const topQuery = scQueries[0];
      md += `**10. Top query**: "${topQuery.query}" drives ${topQuery.impressions} impressions at position ${topQuery.position}. `;
      if (parseFloat(topQuery.position) < 10 && parseFloat(topQuery.ctr) < 3) {
        md += `You rank well but CTR is low — rewrite the meta title/description for this query's page to improve click-through.\n\n`;
      } else if (parseFloat(topQuery.position) > 20) {
        md += `High impressions but weak ranking — a clear opportunity to create targeted content or optimise existing pages for this query.\n\n`;
      } else {
        md += `Healthy baseline — monitor whether clicks grow as position improves.\n\n`;
      }
    }
  } else if (scTotals.error) {
    md += `**9. Google visibility**: Search Console data unavailable (${scTotals.error}). Check API access.\n\n`;
  } else {
    md += `**9. Google visibility**: No Search Console data yet. Typically takes 2-3 days after indexing begins. Check back next week.\n\n`;
  }

  // Write report
  writeFileSync(OUTPUT_PATH, md);
  console.log(md);
  console.log(`\n---\nReport saved to: analytics-report.md`);
}

main().catch((err) => {
  console.error('Error:', err.message);
  if (err.message.includes('permission')) {
    console.error('\nMake sure the service account has Viewer access to GA4 property ' + PROPERTY_ID);
  }
  process.exit(1);
});
