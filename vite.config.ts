import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// Relative base: works on nievon.github.io and under any sub-path.
export default defineConfig({
  base: './',
  plugins: [tailwindcss()],
});
