// Runs after `expo export --platform web`. Expo SDK 49 writes absolute paths
// (/bundles/..., /favicon.ico, /assets/...) and has no baseUrl setting, so the
// build only works from the root of a domain. GitHub Pages serves it from
// /<repo>/, so we rewrite the paths to relative ones. The app has no routing,
// so relative paths are enough.
const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, '..', 'dist');

const indexFile = path.join(dist, 'index.html');
const html = fs.readFileSync(indexFile, 'utf8');
fs.writeFileSync(indexFile, html.replace(/(src|href)="\/(?!\/)/g, '$1="./'));

// Image and font URLs inside the JS bundle start with /assets/.
const bundles = path.join(dist, 'bundles');
for (const name of fs.readdirSync(bundles)) {
  if (!name.endsWith('.js')) continue;
  const file = path.join(bundles, name);
  const js = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(file, js.replace(/(["'])\/assets\//g, '$1./assets/'));
}

// Without this GitHub Pages runs Jekyll, which skips folders starting with _.
fs.writeFileSync(path.join(dist, '.nojekyll'), '');

console.log('Web build paths made relative in dist/');
