/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async headers() {
		return [
			{
				source: "/fish-out",
				headers: [
					{
						key: "Cache-Control",
						value: "s-maxage=2",
					},
				],
			},
		];
	},
};

export default nextConfig;
