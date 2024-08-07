/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'content.etilize.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'store.veemost.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'store.veemost.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'smartstore.veemost.com',
                port: '',
                pathname: '/**',
            }
        ],
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { 
                        key: "Access-Control-Allow-Credentials", 
                        value: "true" 
                    },
                    { 
                        key: "Access-Control-Allow-Origin",
                        value: "http://localhost:3000" 
                    }, // replace this your actual origin
                    { 
                        key: "Access-Control-Allow-Methods", 
                        value: "GET,DELETE,PATCH,POST,PUT" 
                    },
                    { 
                        key: "Access-Control-Allow-Headers", 
                        value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" 
                    },
                ]
            }
        ]
    }
};

export default nextConfig;
