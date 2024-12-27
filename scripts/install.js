const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  console.log('Running npm install...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('npm install completed successfully.');

  // Read the generated package-lock.json
  const packageLockPath = path.join(process.cwd(), 'package-lock.json');
  const packageLock = fs.readFileSync(packageLockPath, 'utf8');
  console.log('package-lock.json content:', packageLock);

} catch (error) {
  console.error('Error during npm install:', error);
  process.exit(1);
}

