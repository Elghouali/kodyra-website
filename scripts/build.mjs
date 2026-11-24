import { rm, mkdir, cp } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const name of ['index.html', '_headers', 'assets', 'src', 'styles', 'solutions']) await cp(name, `dist/${name}`, { recursive: true });
console.log('KODYRA website built into dist/');
