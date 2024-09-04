import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind({
		applyBaseStyles: false
	}), mdx()],
	site: "https://owlu0905.github.io",
	base: "tulip"

});
