#!/usr/bin/env node

/**
 * Generates command/skill files for all supported AI coding platforms.
 * Source of truth: .claude/skills/<skill-name>/SKILL.md
 *
 * Usage: node scripts/sync-skills.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKILLS_DIR = join(ROOT, '.claude', 'skills');

const HEADER = (skillName) =>
  `<!-- AUTO-GENERATED from .claude/skills/${skillName}/SKILL.md — do not edit directly.\n` +
  `     Run \`node scripts/sync-skills.mjs\` to regenerate. -->\n\n`;

function write(relPath, content) {
  const full = join(ROOT, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, 'utf8');
  console.log(`  ✓ ${relPath}`);
}

function noArgs(text) {
  return text.replace(/\$ARGUMENTS/g, 'the arguments provided by the user');
}

function syncSkill(skillName) {
  const source = join(SKILLS_DIR, skillName, 'SKILL.md');
  let raw;
  try {
    raw = readFileSync(source, 'utf8').replace(/\r\n/g, '\n');
  } catch {
    console.error(`  Error: Could not read ${source}`);
    return;
  }

  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    console.error(`  Error: Could not parse frontmatter in ${source}`);
    return;
  }

  const frontmatter = match[1];
  const body = match[2];

  // Extract description from frontmatter
  const descMatch = frontmatter.match(/^description:\s*["']?(.+?)["']?\s*$/m);
  const shortDesc = descMatch
    ? descMatch[1].replace(/^["']|["']$/g, '').split('.')[0].split(',')[0].trim()
    : skillName;

  console.log(`\n  Syncing: ${skillName}`);

  // 1. Codex CLI
  write(`.codex/skills/${skillName}/SKILL.md`, raw);

  // 2. GitHub Copilot
  write(`.github/skills/${skillName}/SKILL.md`, raw);

  // 3. Cursor
  write(`.cursor/commands/${skillName}.md`, HEADER(skillName) + noArgs(body));

  // 4. Windsurf
  write(`.windsurf/workflows/${skillName}.md`, HEADER(skillName) + noArgs(body));

  // 5. Gemini CLI
  const geminiBody = body.replace(/\$ARGUMENTS/g, '{{args}}');
  write(
    `.gemini/commands/${skillName}.toml`,
    `# AUTO-GENERATED from .claude/skills/${skillName}/SKILL.md\n` +
      `# Run \`node scripts/sync-skills.mjs\` to regenerate.\n\n` +
      `description = "${shortDesc}"\n\n` +
      `[prompt]\ntext = '''\n${geminiBody}\n'''\n`
  );

  // 6. OpenCode
  write(
    `.opencode/commands/${skillName}.md`,
    `---\ndescription: "${shortDesc}"\n---\n${HEADER(skillName)}${body}`
  );

  // 7. Augment Code
  write(
    `.augment/commands/${skillName}.md`,
    `---\ndescription: "${shortDesc}"\nargument-hint: "<args>"\n---\n${HEADER(skillName)}${body}`
  );

  // 8. Continue
  write(
    `.continue/commands/${skillName}.md`,
    `---\nname: ${skillName}\ndescription: "${shortDesc}"\ninvokable: true\n---\n${HEADER(skillName)}${body}`
  );

  // 9. Amazon Q
  write(
    `.amazonq/cli-agents/${skillName}.json`,
    JSON.stringify(
      {
        name: skillName,
        description: shortDesc,
        prompt: noArgs(body),
        fileContext: ['AGENTS.md', 'docs/research/**'],
      },
      null,
      2
    ) + '\n'
  );

  console.log(`  → 9 platform files generated for ${skillName}`);
}

// Discover all skills
let skills;
try {
  skills = readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
} catch {
  console.error(`Error: Could not read skills directory at ${SKILLS_DIR}`);
  process.exit(1);
}

if (skills.length === 0) {
  console.error('No skills found in .claude/skills/');
  process.exit(1);
}

console.log(`Syncing ${skills.length} skill(s) to all platforms...`);
skills.forEach(syncSkill);
console.log(`\nDone! ${skills.length * 9} platform command files generated.`);
