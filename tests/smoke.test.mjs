import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const readJson = (path) => JSON.parse(readFileSync(join(root, path), "utf8"));
const readText = (path) => readFileSync(join(root, path), "utf8");

describe("WPX smoke test", () => {
  it("wires a real npm test script and required client-side dependencies", () => {
    const pkg = readJson("package.json");

    assert.equal(pkg.scripts.test, "node --test tests/smoke.test.mjs");
    for (const dependency of ["next", "react", "react-dom", "dompurify", "jszip", "file-saver", "css-tree", "idb", "framer-motion"]) {
      assert.ok(pkg.dependencies[dependency], `missing dependency: ${dependency}`);
    }
  });

  it("keeps the App Router stylesheet and required WPX theme variables present", () => {
    const css = readText("app/globals.css");

    for (const token of ["@tailwind base", "@tailwind components", "@tailwind utilities", "--background", "--surface", "--primary", "--secondary", "--alert", "--text-main", "--text-sub"]) {
      assert.ok(css.includes(token), `missing stylesheet token: ${token}`);
    }
  });

  it("does not introduce server processing surfaces", () => {
    assert.equal(existsSync(join(root, "app/api")), false, "app/api must not exist");
    assert.equal(existsSync(join(root, "pages/api")), false, "pages/api must not exist");
  });

  it("adds the JSON DOM kernel schema with required node fields", () => {
    const types = readText("lib/wpx/dom/types.ts");
    for (const field of ["id", "type", "name", "role", "props", "content", "tokens", "layout", "style", "className", "classAst", "motion", "events", "states", "responsive", "children", "source", "metadata", "createdAt", "updatedAt"]) {
      assert.match(types, new RegExp(`${field}:`), `missing DOM node field: ${field}`);
    }
  });

  it("implements Phase 1-3 DOM actions, search, import, and export contracts", () => {
    const actions = readText("lib/wpx/dom/actions.ts");
    for (const fn of ["updateDomNode", "addDomNode", "removeDomNode", "duplicateDomNode", "moveDomNode", "wrapDomNode", "unwrapDomNode", "replaceDomNode", "selectDomNode", "undo", "redo", "snapshotDom"]) {
      assert.ok(actions.includes(fn), `missing action: ${fn}`);
    }
    assert.ok(readText("lib/wpx/dom/search.ts").includes("searchDomProject"), "missing DOM search engine");
    assert.ok(readText("lib/wpx/dom/importers/html.ts").includes("htmlToDomNodes"), "missing HTML to DOM importer");
    assert.ok(readText("lib/wpx/dom/exporters/html.ts").includes("createDomExportManifest"), "missing DOM export manifest");
  });

  it("documents package usage and JSON DOM audit plan", () => {
    const matrix = readText("docs/PACKAGE_USAGE_MATRIX.md");
    for (const dependency of ["next", "react", "react-dom", "dompurify", "jszip", "file-saver", "css-tree", "idb", "framer-motion", "tailwindcss", "postcss", "autoprefixer", "eslint", "typescript"]) {
      assert.ok(matrix.includes(`| ${dependency} |`), `missing package matrix row: ${dependency}`);
    }
    assert.ok(readText("docs/WPX_JSON_DOM_AUDIT.md").includes("Repository audit summary"));
  });
});
