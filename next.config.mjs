/** @type {import('next').NextConfig} */
const nextConfig = {
    api: {
        bodyParser: {
            sizeLimit: '1000mb',
        },
    },
};


export default nextConfig;
