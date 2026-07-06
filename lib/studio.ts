import * as csstree from "css-tree";
import { openDB } from "idb";
import JSZip from "jszip";

export type StudioProject = {
  name: string;
  html: string;
  css: string;
  updatedAt: string;
};

export const defaultProject: StudioProject = {
  name: "WPX Starter Block",
  html: `<section class="wpx-card">\n  <p class="wpx-kicker">WHISPERX | STUDIO</p>\n  <h1>Design a clean WordPress-ready section.</h1>\n  <p>All content is processed locally in your browser for MVP Phase 1.</p>\n</section>`,
  css: `.wpx-card {\n  padding: 2rem;\n  border-radius: 1.5rem;\n  background: linear-gradient(135deg, #111827, #312e81);\n  color: white;\n}\n.wpx-kicker {\n  color: #22d3ee;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n}`,
  updatedAt: new Date().toISOString(),
};

const dbPromise = () =>
  openDB("wpx-studio", 1, {
    upgrade(db) {
      db.createObjectStore("projects");
    },
  });

export async function saveProject(project: StudioProject) {
  const db = await dbPromise();
  await db.put("projects", project, "current");
}

export async function loadProject() {
  const db = await dbPromise();
  return (await db.get("projects", "current")) as StudioProject | undefined;
}

export function validateCss(css: string) {
  try {
    csstree.parse(css, { context: "stylesheet" });
    return { ok: true, message: "CSS syntax is valid." };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "CSS syntax is invalid." };
  }
}

export async function createExportZip(project: StudioProject, sanitizedHtml: string) {
  const zip = new JSZip();
  zip.file("README.txt", `Exported from WHISPERX | STUDIO\nProject: ${project.name}\nClient-side MVP export.`);
  zip.file("block.html", sanitizedHtml);
  zip.file("styles.css", project.css);
  return zip.generateAsync({ type: "blob" });
}
