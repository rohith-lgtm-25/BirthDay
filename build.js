/**
 * Production Build Script for Vindhya Birthday Surprise Website
 * Creates a clean, validated `dist` output directory for Vercel & static hosting.
 */

const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const distDir = path.join(rootDir, 'dist');

console.log('🚀 Starting production build for Vindhya Birthday Surprise Website...');

// 1. Clean existing dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 2. Helper to copy directories recursively
function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 3. Copy top-level static files
const filesToCopy = ['index.html', 'README.md'];
for (const file of filesToCopy) {
  const src = path.join(rootDir, file);
  const dest = path.join(distDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`  ✓ Copied ${file} -> dist/${file}`);
  }
}

// 4. Copy assets, scripts, and styles directories
const dirsToCopy = ['assets', 'scripts', 'styles'];
for (const dir of dirsToCopy) {
  const src = path.join(rootDir, dir);
  const dest = path.join(distDir, dir);
  if (fs.existsSync(src)) {
    copyDirSync(src, dest);
    console.log(`  ✓ Copied ${dir}/ -> dist/${dir}/`);
  }
}

// 5. Verification: ensure critical production files exist
const criticalFiles = [
  'index.html',
  'styles/main.css',
  'styles/vir.css',
  'styles/effects.css',
  'scripts/app.js',
  'scripts/vir.js',
  'scripts/audio.js',
  'scripts/particles.js',
  'assets/illustrations.js'
];

let allValid = true;
for (const rel of criticalFiles) {
  const checkPath = path.join(distDir, rel);
  if (!fs.existsSync(checkPath) || fs.statSync(checkPath).size === 0) {
    console.error(`  ✗ Error: Missing or empty file dist/${rel}`);
    allValid = false;
  }
}

if (!allValid) {
  console.error('❌ Build validation failed!');
  process.exit(1);
}

console.log('✨ Production build complete! Output directory: dist/');
