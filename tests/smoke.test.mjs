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
});
