import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*',
				pathname: '/**', // VERY IMPORTANT — allow all paths
			},
		],
	},
	// experimental: {
	//   ppr: "incremental",
	// },
};

export default nextConfig;
