/**
 * Equivie MED — Week-over-week trend analysis
 *
 * Pulls 4 consecutive 7-day windows and shows how key metrics
 * have evolved. Uses the same Swiss target market filter as
 * ga-insights.js (CH/DE/FR/AT/IT/LI).
 *
 * Usage: node scripts/ga-weekly-trend.js [--weeks 4] [--all]
 */

import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const PROPERTY_ID = '532551574';
const SITE_URL = 'sc-domain:equiviemed.ch';
const CREDENTIALS_PATH = resolve(ROOT, 'ga-credentials.json');

const weeksArg = process.argv.find((a, i) => process.argv[i - 1] === '--weeks');
const WEEKS = parseInt(weeksArg) || 4;
const ALL_TRAFFIC = process.argv.includes('--all');
const TARGET_COUNTRIES = ['Switzerland', 'Germany', 'France', 'Austria', 'Italy', 'Liechtenstein'];

const credentials = JSON.parse(readFileSync(CREDENTIALS_PATH, 'utf-8'));
const client = new BetaAnalyticsDataClient({
  credentials: { client_email: credentials.client_email, private_key: credentials.private_key },
});
const scAuth = new google.auth.JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
});
const searchConsole = google.searchconsole({ version: 'v1', auth: scAuth });
const property = `properties/${PROPERTY_ID}`;

function buildCountryFilter() {
  if (ALL_TRAFFIC) return undefined;
  return {
    filter: { fieldName: 'country', inListFilter: { values: TARGET_COUNTRIES } },
  };
}

function dateOffset(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().slice(0, 10);
}

function weekRange(weekIndex) {
  // weekIndex 0 = most recent 7 days, 1 = the 7 days before that, etc.
  const startDaysAgo = (weekIndex + 1) * 7 - 1; // e.g. week 0 → 6 days ago
  const endDaysAgo = weekIndex * 7;             // e.g. week 0 → today
  return {
    label: `${dateOffset(startDaysAgo)} → ${dateOffset(endDaysAgo)}`,
    startDate: dateOffset(startDaysAgo),
    endDate: dateOffset(endDaysAgo),
    startDaysAgo,
    endDaysAgo,
  };
}

async function getWeekOverview(range) {
  const [res] = await client.runReport({
    property,
    dateRanges: [{ startDate: `${range.startDaysAgo}daysAgo`, endDate: `${range.endDaysAgo}daysAgo` }],
    metrics: [
      { name: 'totalUsers' },
      { name: 'sessions' },
      { name: 'screenPageViews' },
      { name: 'averageSessionDuration' },
      { name: 'bounceRate' },
    ],
    dimensionFilter: buildCountryFilter(),
  });
  const r = res.rows?.[0];
  if (!r) return { users: 0, sessions: 0, pageviews: 0, avgDuration: 0, bounceRate: '0.0' };
  return {
    users: parseInt(r.metricValues[0]?.value || 0),
    sessions: parseInt(r.metricValues[1]?.value || 0),
    pageviews: parseInt(r.metricValues[2]?.value || 0),
    avgDuration: Math.round(parseFloat(r.metricValues[3]?.value || 0)),
    bounceRate: (parseFloat(r.metricValues[4]?.value || 0) * 100).toFixed(1),
  };
}

async function getWeekEvents(range) {
  const [res] = await client.runReport({
    property,
    dateRanges: [{ startDate: `${range.startDaysAgo}daysAgo`, endDate: `${range.endDaysAgo}daysAgo` }],
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
    const name = r.dimensionValues[0]?.value;
    const count = parseInt(r.metricValues[0]?.value || 0);
    if (name === 'waitlist_modal_open') events.modal_opens = count;
    if (name === 'waitlist_signup') events.signups = count;
  }
  return events;
}

async function getWeekSearch(range) {
  try {
    const res = await searchConsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: range.startDate,
        endDate: range.endDate,
      },
    });
    const r = res.data.rows?.[0];
    if (!r) return { clicks: 0, impressions: 0, ctr: '0.0', position: '0.0' };
    return {
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: (r.ctr * 100).toFixed(1),
      position: r.position.toFixed(1),
    };
  } catch (err) {
    return { clicks: 0, impressions: 0, ctr: '0.0', position: '0.0', error: err.message };
  }
}

function arrow(curr, prev) {
  if (prev === 0 && curr === 0) return '–';
  if (prev === 0) return '↑ new';
  const diff = curr - prev;
  const pct = ((diff / prev) * 100).toFixed(0);
  if (diff > 0) return `↑ +${pct}%`;
  if (diff < 0) return `↓ ${pct}%`;
  return '→ 0%';
}

function arrowFloat(curr, prev) {
  const c = parseFloat(curr);
  const p = parseFloat(prev);
  if (p === 0 && c === 0) return '–';
  if (p === 0) return '↑ new';
  const diff = (c - p).toFixed(1);
  if (c > p) return `↑ +${diff}`;
  if (c < p) return `↓ ${diff}`;
  return '→ 0';
}

async function main() {
  console.log(`Pulling ${WEEKS} weeks of week-over-week data...\n`);

  const ranges = [];
  for (let i = 0; i < WEEKS; i++) ranges.push(weekRange(i));

  // Fetch all metrics for all weeks in parallel
  const overviews = await Promise.all(ranges.map(getWeekOverview));
  const events = await Promise.all(ranges.map(getWeekEvents));
  const searches = await Promise.all(ranges.map(getWeekSearch));

  // --- Print ---
  const filterNote = ALL_TRAFFIC
    ? '**Filter**: ALL TRAFFIC (includes bots and non-target countries)'
    : '**Filter**: Swiss Target Market only (CH/DE/FR/AT/IT/LI) — pass --all for raw view';

  console.log(`# Equivie MED — Week-over-Week Trend`);
  console.log(`**Generated**: ${new Date().toISOString().slice(0, 10)}`);
  console.log(filterNote);
  console.log('');

  // Header row
  const headers = ranges.map((r, i) => i === 0 ? `This week\n${r.label}` : `${i} week${i > 1 ? 's' : ''} ago\n${r.label}`);

  console.log(`## Traffic`);
  console.log(`| Metric | ${headers.join(' | ')} |`);
  console.log(`|--------|${headers.map(() => '------').join('|')}|`);
  console.log(`| Real users | ${overviews.map((o, i) => i === 0 ? `**${o.users}** ${arrow(o.users, overviews[1]?.users || 0)}` : o.users).join(' | ')} |`);
  console.log(`| Sessions | ${overviews.map((o, i) => i === 0 ? `**${o.sessions}** ${arrow(o.sessions, overviews[1]?.sessions || 0)}` : o.sessions).join(' | ')} |`);
  console.log(`| Pageviews | ${overviews.map((o, i) => i === 0 ? `**${o.pageviews}** ${arrow(o.pageviews, overviews[1]?.pageviews || 0)}` : o.pageviews).join(' | ')} |`);
  console.log(`| Avg duration (s) | ${overviews.map((o, i) => i === 0 ? `**${o.avgDuration}s** ${arrow(o.avgDuration, overviews[1]?.avgDuration || 0)}` : `${o.avgDuration}s`).join(' | ')} |`);
  console.log(`| Bounce rate | ${overviews.map((o, i) => i === 0 ? `**${o.bounceRate}%** ${arrowFloat(o.bounceRate, overviews[1]?.bounceRate || 0)}` : `${o.bounceRate}%`).join(' | ')} |`);
  console.log('');

  console.log(`## Waitlist Funnel`);
  console.log(`| Metric | ${headers.join(' | ')} |`);
  console.log(`|--------|${headers.map(() => '------').join('|')}|`);
  console.log(`| Modal opens | ${events.map((e, i) => i === 0 ? `**${e.modal_opens}** ${arrow(e.modal_opens, events[1]?.modal_opens || 0)}` : e.modal_opens).join(' | ')} |`);
  console.log(`| Signups | ${events.map((e, i) => i === 0 ? `**${e.signups}** ${arrow(e.signups, events[1]?.signups || 0)}` : e.signups).join(' | ')} |`);
  console.log('');

  console.log(`## Google Search Performance`);
  console.log(`| Metric | ${headers.join(' | ')} |`);
  console.log(`|--------|${headers.map(() => '------').join('|')}|`);
  console.log(`| Impressions | ${searches.map((s, i) => i === 0 ? `**${s.impressions}** ${arrow(s.impressions, searches[1]?.impressions || 0)}` : s.impressions).join(' | ')} |`);
  console.log(`| Clicks | ${searches.map((s, i) => i === 0 ? `**${s.clicks}** ${arrow(s.clicks, searches[1]?.clicks || 0)}` : s.clicks).join(' | ')} |`);
  console.log(`| CTR | ${searches.map((s, i) => i === 0 ? `**${s.ctr}%** ${arrowFloat(s.ctr, searches[1]?.ctr || 0)}` : `${s.ctr}%`).join(' | ')} |`);
  console.log(`| Avg position | ${searches.map((s, i) => i === 0 ? `**${s.position}** ${arrowFloat(s.position, searches[1]?.position || 0)}` : s.position).join(' | ')} |`);
  console.log('');

  // --- Trend summary ---
  console.log(`---\n`);
  console.log(`## Trend Summary\n`);

  const wk0 = overviews[0];
  const wk1 = overviews[1];
  const wk2 = overviews[2];
  const wk3 = overviews[3];

  // Users trajectory
  const usersTrajectory = [wk3, wk2, wk1, wk0].map((w) => w?.users || 0);
  console.log(`**Users trajectory** (oldest → newest): ${usersTrajectory.join(' → ')}`);
  const userTrendDirection = usersTrajectory[3] > usersTrajectory[0] ? 'growing' : usersTrajectory[3] < usersTrajectory[0] ? 'declining' : 'flat';
  console.log(`→ Direction: **${userTrendDirection}**`);
  console.log('');

  // Engagement
  const durTrajectory = [wk3, wk2, wk1, wk0].map((w) => w?.avgDuration || 0);
  console.log(`**Session duration trajectory** (s, oldest → newest): ${durTrajectory.join(' → ')}`);
  console.log('');

  // Search
  const impTrajectory = [searches[3], searches[2], searches[1], searches[0]].map((s) => s?.impressions || 0);
  console.log(`**Search impressions trajectory** (oldest → newest): ${impTrajectory.join(' → ')}`);
  const clickTrajectory = [searches[3], searches[2], searches[1], searches[0]].map((s) => s?.clicks || 0);
  console.log(`**Search clicks trajectory** (oldest → newest): ${clickTrajectory.join(' → ')}`);
  console.log('');

  // Cumulative signups
  const totalSignups = events.reduce((s, e) => s + e.signups, 0);
  const totalOpens = events.reduce((s, e) => s + e.modal_opens, 0);
  console.log(`**Cumulative waitlist** (last ${WEEKS} weeks): ${totalSignups} signups from ${totalOpens} modal opens`);
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
