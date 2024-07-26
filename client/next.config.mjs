/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    images:{
        domains:['maps.googleapis.com']
    }
};

export default nextConfig;
