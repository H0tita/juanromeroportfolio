// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Production URL: used for absolute links in share previews (og:image, canonical).
  site: 'https://juanromeroportfolio.com',
  integrations: [react()]
});
