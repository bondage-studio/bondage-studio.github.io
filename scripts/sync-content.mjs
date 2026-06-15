#!/usr/bin/env node
/**
 * Aggregate docs from the `site/` directory of other repos in the org.
 *
 * Reads content.sources.json and, for each source, shallow-clones the repo
 * (sparse-checking out only its docs dir) and copies that dir's contents into
 *   src/content/docs/_ext/<name>/
 * where <name> becomes the URL namespace. The expected per-repo layout is:
 *   <dir>/<locale>/<...>.md   e.g.  site/en/intro.md  ->  /<name>/intro
 *                                   site/zh/intro.md  ->  /zh/<name>/intro
 *
 * Usage:
 *   node scripts/sync-content.mjs           # warn & continue on per-source error
 *   node scripts/sync-content.mjs --strict  # fail the build on any source error
 *   node scripts/sync-content.mjs --clean   # only remove synced content, then exit
 *
 * Private repos: set GITHUB_TOKEN in the environment (the deploy workflow does).
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, mkdirSync, cpSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const EXT_DIR = join(root, 'src', 'content', 'docs', '_ext');
const CONFIG = join(root, 'content.sources.json');

const args = new Set(process.argv.slice(2));
const strict = args.has('--strict');

function log(...m) {
  console.log('[sync]', ...m);
}

function git(cwd, ...a) {
  execFileSync('git', a, { cwd, stdio: ['ignore', 'pipe', 'inherit'] });
}

function authedUrl(repo) {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  return token
    ? `https://x-access-token:${token}@github.com/${repo}.git`
    : `https://github.com/${repo}.git`;
}

function syncSource(src) {
  const { name, repo, ref = 'main', dir = 'site' } = src;
  if (!name || !repo) throw new Error(`source missing "name" or "repo": ${JSON.stringify(src)}`);

  const tmp = mkdtempSync(join(tmpdir(), `bs-sync-${name}-`));
  try {
    log(`cloning ${repo}@${ref} (${dir}/)`);
    git(tmp, 'init', '-q');
    git(tmp, 'remote', 'add', 'origin', authedUrl(repo));
    git(tmp, 'config', 'core.sparseCheckout', 'true');
    git(tmp, 'sparse-checkout', 'set', dir);
    git(tmp, 'fetch', '-q', '--depth', '1', 'origin', ref);
    git(tmp, 'checkout', '-q', 'FETCH_HEAD');

    const from = join(tmp, dir);
    if (!existsSync(from)) throw new Error(`"${dir}/" not found in ${repo}@${ref}`);

    const dest = join(EXT_DIR, name);
    rmSync(dest, { recursive: true, force: true });
    mkdirSync(dest, { recursive: true });
    cpSync(from, dest, {
      recursive: true,
      filter: (s) => !s.includes(`${join(from, '.git')}`),
    });
    log(`✓ ${name} -> src/content/docs/_ext/${name}`);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

function main() {
  // Always start from a clean slate so removed upstream files don't linger.
  rmSync(EXT_DIR, { recursive: true, force: true });
  if (args.has('--clean')) {
    log('cleaned synced content');
    return;
  }

  if (!existsSync(CONFIG)) {
    log('no content.sources.json; nothing to sync');
    return;
  }

  const config = JSON.parse(readFileSync(CONFIG, 'utf8'));
  const sources = (config.sources ?? []).filter((s) => s && !s.$example);

  if (sources.length === 0) {
    log('no active sources configured; nothing to sync');
    return;
  }

  mkdirSync(EXT_DIR, { recursive: true });
  let failures = 0;
  for (const src of sources) {
    try {
      syncSource(src);
    } catch (err) {
      failures++;
      console.error(`[sync] ✗ ${src?.name ?? '?'}: ${err.message}`);
      if (strict) throw err;
    }
  }
  log(`done (${sources.length - failures}/${sources.length} sources synced)`);
}

main();
