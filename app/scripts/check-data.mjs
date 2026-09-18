#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const app = path.resolve(import.meta.dirname, "..");
const content = path.resolve(process.env.CONTENT_DIR ?? path.join(app, "..", "content"));
const allowed = new Set(["01-sources", "02-concepts"]);
let failures = 0;

function check(name, okay, detail = "") {
  console.log(`${okay ? "PASS" : "FAIL"}  ${name}${detail ? ` - ${detail}` : ""}`);
  if (!okay) failures++;
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const rootEntries = fs.readdirSync(content, { withFileTypes: true });
const rootDirectories = rootEntries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
const rootFiles = rootEntries.filter((entry) => entry.isFile()).map((entry) => entry.name);
check("Content root contains exactly two directories", rootDirectories.length === 2 && rootDirectories.every((name) => allowed.has(name)), rootDirectories.join(", "));
check("Content root has no loose files", rootFiles.length === 0, rootFiles.join(", "));

const sourceDir = path.join(content, "01-sources");
const conceptDir = path.join(content, "02-concepts");
const sourceMarkdown = walk(sourceDir).filter((file) => file.endsWith(".md"));
const conceptFolders = walk(conceptDir)
  .filter((file) => file.endsWith(".md"))
  .map((file) => path.dirname(path.dirname(file)));
const uniqueConceptFolders = new Set(conceptFolders);

check("Source documents are present", sourceMarkdown.length > 0, `${sourceMarkdown.length} Markdown files`);
check("Concepts are present", uniqueConceptFolders.size > 0, `${uniqueConceptFolders.size} concept folders`);
check("Every concept has supporting Markdown", [...uniqueConceptFolders].every((folder) => walk(path.join(folder, "sources")).some((file) => file.endsWith(".md"))));

console.log(failures ? `\n${failures} check(s) failed.` : "\nAll source and concept checks passed.");
process.exit(failures ? 1 : 0);
