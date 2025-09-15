/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// Allow loading images from pexels (https://images.pexels.com)
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.pexels.com',
				port: '',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;
