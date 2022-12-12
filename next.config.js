/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["storage.googleapis.com"],
		minimumCacheTTL: 1500000,
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
	swcMinify: true,
};

module.exports = nextConfig;
