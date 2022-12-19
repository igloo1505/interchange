/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
	disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
	reactStrictMode: true,
	poweredByHeader: false,
	images: {
		domains: ["storage.googleapis.com"],
		minimumCacheTTL: 1500000,
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
	swcMinify: true,
});
