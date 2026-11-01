'use strict';
// The giveaway is files, not a program: these checks keep the repo honest before every push.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.join(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(ROOT, ...p), 'utf8');
const SKIP = new Set(['.git', 'node_modules', 'dist']);
function files(dir = ROOT) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...files(p)); else out.push(p);
  }
  return out;
}
// text of every file; structures are gzipped NBT, so look inside them too
function text(p) {
  const buf = fs.readFileSync(p);
  return p.endsWith('.nbt') ? zlib.gunzipSync(buf).toString('latin1') : buf.toString('utf8');
}

test('no episode number and no machine paths in any file', () => {
  const bad = [/\bep\s*0*\d+\b/i, /ep0\d\d/i, /\b[A-Z]:[\\/]/];
  const hits = [];
  for (const f of files()) {
    if (f.endsWith('release.test.js')) continue;
    const t = text(f);
    for (const re of bad) if (re.test(t)) hits.push(`${path.relative(ROOT, f)}: ${re}`);
  }
  assert.deepStrictEqual(hits, []);
});

test('server-files hold byte-identical copies of the boss files', () => {
  const pairs = [];
  for (const ai of ['chatgpt', 'claude']) {
    const boss = path.join(ROOT, 'bosses', ai, 'boss');
    for (const f of fs.readdirSync(path.join(boss, 'blueprints'))) {
      pairs.push([path.join(boss, 'blueprints', f), path.join(ROOT, 'server-files/plugins/ModelEngine/blueprints/vreki_bosses', f)]);
    }
    for (const kind of ['mobs', 'skills']) {
      for (const f of fs.readdirSync(path.join(boss, kind))) {
        pairs.push([path.join(boss, kind, f), path.join(ROOT, 'server-files/plugins/MythicMobs/packs/vreki_bosses', kind, f)]);
      }
    }
  }
  assert.ok(pairs.length >= 10);
  for (const [a, b] of pairs) assert.ok(fs.readFileSync(a).equals(fs.readFileSync(b)), `${b} differs from ${a}`);
});

test('every arena function places a structure that exists and the README names it', () => {
  const dp = 'server-files/datapacks/vreki_boss_arenas';
  JSON.parse(read(dp, 'pack.mcmeta'));
  const readme = read('README.md');
  const guide = read('INSTALL-FOR-AI.md');
  for (const arena of ['akkrakhong_arena', 'vesper_arena']) {
    const fn = read(dp, 'data/vreki_bosses/function', `${arena}.mcfunction`);
    assert.ok(fn.includes(`place template vreki_bosses:${arena} `), arena);
    assert.ok(fn.includes('function vreki_bosses:spawn_hint with storage vreki_bosses:spawn'));
    assert.ok(fs.existsSync(path.join(ROOT, dp, 'data/vreki_bosses/structure', `${arena}.nbt`)));
    assert.ok(readme.includes(`/function vreki_bosses:${arena}`));
    assert.ok(guide.includes(`/function vreki_bosses:${arena}`));
  }
  assert.ok(read(dp, 'data/vreki_bosses/function/spawn_hint.mcfunction').includes('/mm mobs spawn $(boss) 1 world,$(x),$(y),$(z)'));
});

test('README says how to install and what is needed', () => {
  const r = read('README.md');
  for (const s of ['Paper 1.21.11', 'MythicMobs Premium 5.13', 'ModelEngine 4.1', 'resource pack.zip',
    'เปิด Claude Code หรือ Codex ในโฟลเดอร์นี้ แล้วพิมพ์ว่า', 'INSTALL-FOR-AI.md', 'PROMPT.md', 'discord.gg/nZcYBwB5fc']) {
    assert.ok(r.includes(s), `README misses ${s}`);
  }
  assert.match(r, /https:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/@VreKi_018\/videos)/);
  assert.ok(read('INSTALL-FOR-AI.md').includes('Do not start the server yourself'));
});

test('the prompt says there is one other AI, not two', () => {
  const p = read('PROMPT.md');
  assert.ok(p.includes('มี AI อีกค่ายหนึ่งได้โจทย์เดียวกัน'));
  assert.ok(!p.includes('มี AI อีกสองค่าย'));
});

test('LICENSE is MIT for VreKi_', () => {
  const l = read('LICENSE');
  assert.match(l, /^MIT License/);
  assert.ok(l.includes('Copyright (c) 2026 VreKi_'));
});
