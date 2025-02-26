import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import mdPlugin from 'vite-plugin-markdown';
import generateMetaData from './plugins/generateMetaData.js';

export default defineConfig({
  base: './',
  plugins: [
    vue(), 
    mdPlugin.default(),
    generateMetaData()
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },
  server: {
    port: 3000,
  },
})