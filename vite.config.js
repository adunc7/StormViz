// vite.config.js

import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env.VITE_API_KEY': JSON.stringify(process.env.VITE_API_KEY),
  },
});

/*
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'import.meta.env.VITE_API_KEY': JSON.stringify(process.env.VITE_API_KEY),
  },
});
*/