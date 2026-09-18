#!/usr/bin/env node
/**
 * Keeps node_modules and the Turbopack cache on local disk when the repository
 * itself lives on a network share.
 *
 * The repository is stored on a Windows machine and opened over SMB from macOS.
 * There, Turbopack cannot fsync its cache ("Operation not supported (os error 45)")
 * and loading Next.js from the share takes minutes. Both problems disappear when
 * the heavy folders sit on local disk and the project keeps symlinks to them.
 *
 * On Windows, and on any local path, this script does nothing.
 *
 * Note: never run `npm install` inside app/ on the share. npm replaces the
 * node_modules symlink with a real folder. Use `npm run setup` instead, which
 * installs into the local cache with `--prefix`.
 */

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const appDir = path.resolve(import.meta.dirname, "..");
const onNetworkShare = process.platform === "darwin" && appDir.startsWith("/Volumes/");
const wantInstall = process.argv.includes("--install");

if (!onNetworkShare) {
  if (wantInstall) run("npm", ["install", "--no-audit", "--no-fund"], appDir);
  process.exit(0);
}

const key = createHash("sha1").update(appDir).digest("hex").slice(0, 8);
const cacheRoot = path.join(os.homedir(), ".cache", "cwh-explorer", key);
fs.mkdirSync(cacheRoot, { recursive: true });

function run(cmd, args, cwd) {
  const res = spawnSync(cmd, args, { cwd, stdio: "inherit", shell: process.platform === "win32" });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

function ensureLink(relPath, targetDir) {
  const link = path.join(appDir, relPath);
  fs.mkdirSync(targetDir, { recursive: true });
  const stat = fs.lstatSync(link, { throwIfNoEntry: false });

  if (stat?.isSymbolicLink()) {
    if (fs.readlinkSync(link) === targetDir) return false;
    fs.unlinkSync(link);
  } else if (stat?.isDirectory()) {
    // A real folder here would be read from the share on every import, which is what we are avoiding.
    console.error(`[local-cache] ${relPath} is a real folder inside the project on a network share.`);
    console.error(`[local-cache] Remove it first, then run this again:\n    rm -rf "${link}"`);
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(link), { recursive: true });
  fs.symlinkSync(targetDir, link);
  return true;
}

const modulesDir = path.join(cacheRoot, "node_modules");
const linkedModules = ensureLink("node_modules", modulesDir);
const linkedCache = ensureLink(path.join(".next", "dev", "cache"), path.join(cacheRoot, "turbopack-cache"));

if (linkedModules || linkedCache) console.log(`[local-cache] node_modules and the Turbopack cache now live in ${cacheRoot}`);

// Install into the cache directory, so npm never touches the symlink.
const manifest = path.join(cacheRoot, "package.json");
const needsInstall = wantInstall || !fs.existsSync(path.join(modulesDir, "next"));

if (needsInstall) {
  for (const file of ["package.json", "package-lock.json"]) {
    const from = path.join(appDir, file);
    if (fs.existsSync(from)) fs.copyFileSync(from, path.join(cacheRoot, file));
  }
  console.log("[local-cache] Installing dependencies into the local cache…");
  run("npm", ["install", "--no-audit", "--no-fund", "--prefix", cacheRoot], cacheRoot);
  // Keep the lockfile the project ships in sync with what was installed.
  const lock = path.join(cacheRoot, "package-lock.json");
  if (fs.existsSync(lock)) fs.copyFileSync(lock, path.join(appDir, "package-lock.json"));
} else if (fs.existsSync(manifest)) {
  const a = fs.readFileSync(path.join(appDir, "package.json"), "utf8");
  const b = fs.readFileSync(manifest, "utf8");
  if (a !== b) console.warn("[local-cache] package.json changed. Run `npm run setup` to update the local install.");
}
