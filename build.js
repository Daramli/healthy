const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting build process...');

try {
  // Install dependencies
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Create dist directory if it doesn't exist
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }

  // Copy package.json to dist
  fs.copyFileSync('package.json', 'dist/package.json');

  // Build TypeScript
  console.log('Building TypeScript...');
  execSync('npx tsc', { stdio: 'inherit' });

  // Build Vite
  console.log('Building Vite...');
  execSync('npx vite build', { stdio: 'inherit' });

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 