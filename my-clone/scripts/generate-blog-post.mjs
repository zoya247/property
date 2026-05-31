#!/usr/bin/env node
/**
 * Weekly AI blog post generator for London Bridge Stays.
 *
 * Picks the next unused topic (rotating list), calls the Claude API to write
 * a full blog post, then appends it to src/app/blog/posts.ts.
 *
 * Required env:  ANTHROPIC_API_KEY
 * Optional env:  CUSTOM_TOPIC  (overrides auto-selection)
 *
 * GitHub Actions output:  post_title (used in the commit message)
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_FILE = path.join(__dirname, "../src/app/blog/posts.ts");

// ─── Topic rotation ──────────────────────────────────────────────────────────
const TOPIC_POOL = [
  { slug: "best-restaurants-london-bridge-se1", title: "The Best Restaurants Near London Bridge in {YEAR}", emoji: "🍽️" },
  { slug: "southbank-walk-guide", title: "The Perfect South Bank Walk: London Bridge to Waterloo", emoji: "🌉" },
  { slug: "london-bridge-vs-canary-wharf-stay", title: "London Bridge vs Canary Wharf: Which Is Better for Business Stays?", emoji: "🏢" },
  { slug: "guys-hospital-accommodation-guide", title: "Accommodation Near Guy's Hospital: A Complete Guide for NHS Staff", emoji: "🏥" },
  { slug: "kings-college-london-housing-guide", title: "Short-Term Housing Near King's College London: Your Options Explained", emoji: "🎓" },
  { slug: "se1-hidden-gems", title: "10 Hidden Gems in SE1 That Most Tourists Miss", emoji: "💎" },
  { slug: "london-bridge-with-kids", title: "London Bridge with Kids: A Family Guide to SE1", emoji: "👨‍👩‍👧" },
  { slug: "weekend-in-london-bridge-itinerary", title: "The Perfect Weekend in London Bridge: A 48-Hour Itinerary", emoji: "🗓️" },
  { slug: "tate-modern-visitors-guide", title: "Tate Modern: The Complete Visitor's Guide from London Bridge", emoji: "🎨" },
  { slug: "tower-bridge-guide", title: "Tower Bridge: Everything You Need to Know Before You Visit", emoji: "🏰" },
  { slug: "southwark-cathedral-guide", title: "Southwark Cathedral: History, Visiting Hours & What to See", emoji: "⛪" },
  { slug: "london-bridge-coffee-guide", title: "Best Independent Coffee Shops Near London Bridge", emoji: "☕" },
  { slug: "corporate-travel-london-bridge", title: "Why London Bridge SE1 Is the Smart Choice for Corporate Travellers", emoji: "💼" },
  { slug: "airbnb-vs-hotel-london-bridge", title: "Airbnb vs Hotel Near London Bridge: Which Is Better for Your Stay?", emoji: "🛏️" },
  { slug: "london-bridge-night-out", title: "A Night Out in SE1: Bars, Pubs & Entertainment Near London Bridge", emoji: "🍺" },
  { slug: "maltby-street-market-guide", title: "Maltby Street Market: The Local Alternative to Borough Market", emoji: "🥨" },
  { slug: "relocation-london-checklist", title: "Relocating to London? Your Complete Checklist for a Smooth Move", emoji: "📋" },
  { slug: "london-bridge-running-routes", title: "Best Running Routes From London Bridge Along the Thames", emoji: "🏃" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getCurrentSlugs() {
  const content = fs.readFileSync(POSTS_FILE, "utf8");
  const matches = [...content.matchAll(/slug:\s*["']([^"']+)["']/g)];
  return new Set(matches.map((m) => m[1]));
}

function pickTopic(customTopic) {
  if (customTopic) {
    const slug = customTopic.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    return { slug, title: customTopic, emoji: "📝" };
  }
  const used = getCurrentSlugs();
  const available = TOPIC_POOL.filter((t) => !used.has(t.slug));
  if (available.length === 0) {
    console.log("All topics used — cycling back to start.");
    return TOPIC_POOL[Math.floor(Math.random() * TOPIC_POOL.length)];
  }
  return available[0];
}

function slugToTitle(slug) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function setGitHubOutput(name, value) {
  const outputFile = process.env.GITHUB_OUTPUT;
  if (outputFile) {
    fs.appendFileSync(outputFile, `${name}=${value}\n`);
  } else {
    console.log(`::set-output name=${name}::${value}`);
  }
}

// ─── Claude prompt ────────────────────────────────────────────────────────────

function buildPrompt(topic) {
  const year = new Date().getFullYear();
  const title = topic.title.replace("{YEAR}", year);
  return `You are a content writer for London Bridge Stays, a short-term rental apartment in SE1 London (Longstone Court, 22 Great Dover Street, SE1 4LB — 3 mins from London Bridge Station, next to The Shard, near Borough Market).

Write a comprehensive, SEO-optimised blog post for the following topic:

Title: ${title}

Requirements:
- 700–1000 words
- Use markdown headings (##, ###)
- Include practical, specific, factual information about London Bridge / SE1
- Naturally mention London Bridge Stays 1–2 times as a convenient base nearby
- End with a CTA linking to the Airbnb listing: https://www.airbnb.co.uk/rooms/1502751749003658542
- Write for humans first, then for search engines
- Do NOT use filler phrases like "In conclusion" or "In summary"
- Format: Return ONLY the markdown content, starting with the # heading. No preamble, no explanation.

Context about the property:
- 2 bedrooms, 2 bathrooms, sleeps 6
- Zone 1, SE1 4LB
- Steps from London Bridge Station (Jubilee/Northern line), The Shard, Borough Market
- Ideal for professionals, extended stays, relocations
- Check-in 3pm, checkout 11am
- Airbnb listing: 1502751749003658542`;
}

// ─── Post file update ─────────────────────────────────────────────────────────

function appendPostToFile(slug, title, emoji, excerpt, content) {
  const raw = fs.readFileSync(POSTS_FILE, "utf8");

  // Escape backticks and template literals in content
  const safeContent = content.replace(/`/g, "\\`").replace(/\${/g, "\\${");
  const safeExcerpt = excerpt.replace(/"/g, '\\"');
  const safeTitle = title.replace(/"/g, '\\"');

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  const newEntry = `  {
    slug: "${slug}",
    title: "${safeTitle}",
    excerpt: "${safeExcerpt}",
    date: "${dateStr}",
    readTime: "5 min read",
    emoji: "${emoji}",
    content: \`
${safeContent}
    \`,
  },`;

  // Insert before the closing ]; of the posts array
  const updated = raw.replace(/\];\s*$/, `${newEntry}\n];\n`);
  fs.writeFileSync(POSTS_FILE, updated, "utf8");
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");

  const client = new Anthropic({ apiKey });
  const topic = pickTopic(process.env.CUSTOM_TOPIC);
  const finalTitle = topic.title.replace("{YEAR}", new Date().getFullYear());

  console.log(`📝 Generating post: "${finalTitle}" (${topic.slug})`);

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    messages: [{ role: "user", content: buildPrompt(topic) }],
  });

  const content = message.content[0].type === "text" ? message.content[0].text : "";
  if (!content) throw new Error("Claude returned no content");

  // Extract excerpt from the first paragraph after the H1
  const lines = content.split("\n").filter((l) => l.trim());
  const firstPara = lines.find((l) => !l.startsWith("#") && l.length > 60) ?? lines[1] ?? "";
  const excerpt = firstPara.replace(/[*_`]/g, "").slice(0, 160).trim();

  appendPostToFile(topic.slug, finalTitle, topic.emoji, excerpt, content);

  console.log(`✅ Post appended to posts.ts`);
  console.log(`   Title: ${finalTitle}`);
  console.log(`   Slug:  ${topic.slug}`);

  setGitHubOutput("post_title", finalTitle);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
