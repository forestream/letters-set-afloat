/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				"button-hover": "rgba(255, 255, 255, 0.2)",
			},
			translate: {
				"profile-menu": "calc(100% + 1rem)",
			},
			transitionProperty: {
				toast: "opacity, transform",
			},
		},
	},
	plugins: [],
};
