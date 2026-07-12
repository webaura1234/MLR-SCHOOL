/**
 * Dev server tuned for iCloud Drive: cache + webpack live outside synced folder.
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Only use the iCloud workaround if we are on macOS and the project resides in iCloud Drive
const isICloud = process.platform === 'darwin' && (
  root.includes('com~apple~CloudDocs') || 
  root.includes('Mobile Documents')
);

if (isICloud) {
  console.log('→ iCloud Drive detected, configuring external cache symlink...');
  const cacheDir = path.join(os.homedir(), '.cache', 'mlr-school-next');
  const nextLink = path.join(root, '.next');

  try {
    fs.mkdirSync(cacheDir, { recursive: true });

    try {
      const stat = fs.lstatSync(nextLink);
      if (stat.isSymbolicLink()) {
        fs.unlinkSync(nextLink);
      } else if (stat.isDirectory()) {
        fs.rmSync(nextLink, { recursive: true, force: true });
      }
    } catch {
      /* .next does not exist yet */
    }

    fs.symlinkSync(cacheDir, nextLink);
    console.log(`→ Symlinked .next to ${cacheDir}`);
  } catch (err) {
    console.warn(`→ Warning: Could not create symlink for iCloud cache directory: ${err.message}`);
    console.warn(`→ Proceeding with standard directory structure.`);
  }
} else {
  console.log('→ Starting dev server in standard local mode...');
}

const env = {
  ...process.env,
  WATCHPACK_POLLING: 'true',
  CHOKIDAR_USEPOLLING: 'true',
  NEXT_TELEMETRY_DISABLED: '1',
};

const child = spawn('npx', ['next', 'dev', '--hostname', '127.0.0.1', '--port', '3000', '--webpack'], {
  cwd: root,
  stdio: 'inherit',
  env,
  shell: process.platform === 'win32',
});

child.on('exit', (code) => process.exit(code ?? 0));
