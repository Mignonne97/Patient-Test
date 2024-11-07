import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';

const key = fs.readFileSync(`${__dirname}/cert/key.pem`);
const cert = fs.readFileSync(`${__dirname}/cert/cert.pem`);

console.log('Key:', key.toString());
console.log('Cert:', cert.toString());

export default defineConfig({
  // server: {
  //   https: {
  //     key,
  //     cert
  //   },
  //   proxy: {},
  //   host: true
  // },
  plugins: [
    sveltekit(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      manifest: {
        name: 'My App',
        short_name: 'App',
        description: 'My SvelteKit App',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  build: {
    target: 'esnext', // Target modern JavaScript environments
    rollupOptions: {
      output: {
        format: 'es', // Use ES module format
      },
    },
  },
  worker: {
    format: 'es', // Ensure worker format is set to 'es'
  },
  esbuild: {
    target: 'esnext', // Target the latest JavaScript version that supports top-level await
  }
});

