import { copyFile, mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const sourceRoot = fileURLToPath(new URL('../', import.meta.url));
const exportRoot = path.join(sourceRoot, 'dist/client');
const publishRoot = path.dirname(sourceRoot);
const basePath = '/sebastian-engineering-garage';
const generated = [];

async function* files(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* files(fullPath);
    else if (entry.isFile()) yield fullPath;
  }
}

async function write(relativePath, content) {
  const target = path.resolve(publishRoot, relativePath);
  if (!target.startsWith(`${publishRoot}${path.sep}`) || /^(?:\.git|portfolio-src)(?:\/|$)/.test(relativePath)) {
    throw new Error(`Invalid publish path: ${relativePath}`);
  }
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content);
  generated.push(relativePath);
}

function redirectPage(route) {
  const target = `${basePath}${route}`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Sebastian Keltz | Portfolio</title><link rel="canonical" href="https://sebastiankeltz.github.io${target}"><meta http-equiv="refresh" content="0;url=${target}"><script>location.replace(${JSON.stringify(target)} + location.search + location.hash);</script></head><body><p><a href="${target}">Continue to Sebastian Keltz’s portfolio</a></p></body></html>\n`;
}

for await (const file of files(exportRoot)) {
  let relativePath = path.relative(exportRoot, file).split(path.sep).join('/');
  if (relativePath.startsWith('.vite/') || relativePath === 'vinext-client-entry-manifest.json') continue;
  // Vinext places prefixed assets in a matching directory; Pages supplies that prefix.
  if (relativePath.startsWith(`${basePath.slice(1)}/`)) relativePath = relativePath.slice(basePath.length);
  if (relativePath.endsWith('.html') && !['index.html', '404.html'].includes(relativePath)) {
    const route = `/${relativePath.slice(0, -5)}/`;
    await write(relativePath, redirectPage(route));
    relativePath = `${relativePath.slice(0, -5)}/index.html`;
  }
  const target = path.join(publishRoot, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await copyFile(file, target);
  generated.push(relativePath);
}

const legacyRoutes = {
  'academic.html': '/academics/',
  'calculators.html': '/toolkit/',
  'projects/cad-3d-printing.html': '/projects/cad-prototyping/',
  'coursework/electronics-labs.html': '/academics/',
};
for (const [oldPath, route] of Object.entries(legacyRoutes)) await write(oldPath, redirectPage(route));
await write('.nojekyll', '');
console.log(`Prepared ${generated.length} public files in ${publishRoot}`);
