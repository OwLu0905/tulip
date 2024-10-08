/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				foreground: 'rgb(var(--text) / <alpha-value>)',
				background: 'rgb(var(--background) / <alpha-value>)',
				primary: 'rgb(var(--primary) / <alpha-value>)',
				secondary: 'rgb(var(--secondary) / <alpha-value>)',
				accent: 'rgb(var(--accent) / <alpha-value>)',
			},
			boxShadow: {
				code: "0px 0px 0.5rem 2px rgb(var(--accent))"
			}
		},
	},
	plugins: [],
	important: true
}
