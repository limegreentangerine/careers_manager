import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { globSync } from 'glob';
import path from 'path';

// Resolve glob pattern to find all entry files, excluding vendor
const entries = globSync('**/**/ts/index.ts', { ignore: ['vendor/**'] });

// Convert array of files to rollup input object
const input = {};
entries.forEach((file) => {
	const dir = path.dirname(file); // blocks/job_list/ts
	const blockPath = path.dirname(dir); // blocks/job_list
	input[blockPath] = file;
});

// Generate name from block path (e.g., 'blocks/job_list' -> 'JobList')
const getEntryName = (entryPath) => {
	const name = path
		.basename(entryPath)
		.replace(/([-_])([a-z])/g, (_, sep, char) => char.toUpperCase());
	return name.charAt(0).toUpperCase() + name.slice(1);
};

export default defineConfig({
	plugins: [svelte()],
	build: {
		lib: {
			entry: input,
			name: 'BlockModule',
			formats: ['iife']
		},
		outDir: '.',
		target: 'es2019',
		minify: false,
		rollupOptions: {
			output: {
				format: 'iife',
				entryFileNames: '[name]/view.js',
				extend: true
			}
		}
	}
});
