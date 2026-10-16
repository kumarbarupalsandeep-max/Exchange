#!/usr/bin/env node
/**
 * Dependency-free static smoke checks for the Exchange frontend.
 * Run from the repository root: node scripts/validate-project.mjs
 * This validates file references and syntax only; it is not browser or security QA.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, extname } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const failures = [];
const pass = (message) => console.log(`PASS  ${message}`);
const fail = (message) => failures.push(message);

const expectedPages = [
  "index.html", "markets.html", "trade.html", "earn.html", "wallet.html",
  "login.html", "register.html", "support.html", "about.html"
];
for (const page of expectedPages) {
  if (existsSync(resolve(root, page))) pass(`page exists: ${page}`);
  else fail(`missing page: ${page}`);
}

const htmlFiles = readdirSync(root).filter((file) => extname(file) === ".html");
let checkedReferences = 0;
for (const file of htmlFiles) {
  const html = readFileSync(resolve(root, file), "utf8");
  const refs = [...html.matchAll(/(?:href|src)=["']([^"'#]+)["']/gi)];
  for (const match of refs) {
    const ref = match[1].trim();
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(ref)) continue;
    const path = decodeURIComponent(ref.split(/[?#]/, 1)[0]);
    if (!path) continue;
    checkedReferences++;
    if (!existsSync(resolve(root, path))) fail(`${file}: broken local reference "${ref}"`);
  }
}
if (!failures.some((message) => message.includes("broken local reference"))) {
  pass(`local HTML references resolve (${checkedReferences} checked)`);
}

for (const file of ["js/script.js", "js/pages.js"]) {
  if (!existsSync(resolve(root, file))) {
    fail(`missing JavaScript file: ${file}`);
    continue;
  }
  const result = spawnSync(process.execPath, ["--check", resolve(root, file)], { encoding: "utf8" });
  if (result.status === 0) pass(`JavaScript syntax: ${file}`);
  else fail(`JavaScript syntax error in ${file}: ${result.stderr || result.stdout}`);
}

for (const file of ["css/style.css", "css/pages.css"]) {
  if (!existsSync(resolve(root, file))) {
    fail(`missing stylesheet: ${file}`);
    continue;
  }
  const css = readFileSync(resolve(root, file), "utf8");
  const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, "");
  let depth = 0;
  let balanced = true;
  for (const char of withoutComments) {
    if (char === "{") depth++;
    if (char === "}") depth--;
    if (depth < 0) balanced = false;
  }
  if (balanced && depth === 0) pass(`CSS brace balance: ${file}`);
  else fail(`unbalanced CSS braces in ${file}`);
}

if (failures.length) {
  console.error("\nStatic validation failed:");
  for (const message of failures) console.error(`FAIL  ${message}`);
  process.exitCode = 1;
} else {
  console.log("\nAll static smoke checks passed.");
}
