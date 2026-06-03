/**
 * Dev server tuned for iCloud Drive: cache + webpack live outside synced folder.
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cacheDir = path.join(os.homedir(), '.cache', 'mlr-school-next');
const nextLink = path.join(root, '.next');

fs.mkdirSync(cacheDir, { recursive: true });

try {
  const stat = fs.lstatSync(nextLink);
  if (stat.isSymbolicLink()) fs.unlinkSync(nextLink);
  else if (stat.isDirectory()) fs.rmSync(nextLink, { recursive: true, force: true });
} catch {
  /* .next does not exist yet */
}

fs.symlinkSync(cacheDir, nextLink);

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
