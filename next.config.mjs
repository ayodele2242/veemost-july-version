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
                source: '/api/:path*',
                headers: [
                    { 
                        key: "Access-Control-Allow-Credentials", 
                        value: "true" 
                    },
                    { 
                        key: "Access-Control-Allow-Origin",
                        value: "http://localhost:3000" 
                    }, // replace this with your actual origin
                    { 
                        key: "Access-Control-Allow-Methods", 
                        value: "GET,DELETE,PATCH,POST,PUT" 
                    },
                    { 
                        key: "Access-Control-Allow-Headers", 
                        value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" 
                    },
                ],
            },
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                         value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.stripe.com https://*.paypal.com https://www.paypalobjects.com https://embed.tawk.to https://*.tawk.to https://www.clarity.ms https://cdn.jsdelivr.net;
              style-src 'self' 'unsafe-inline' https://*.stripe.com https://*.paypal.com https://www.paypalobjects.com https://embed.tawk.to https://*.tawk.to https://cdn.jsdelivr.net;
              img-src 'self' data: https: blob:;
              font-src 'self' data: https://*.stripe.com https://*.paypal.com https://www.paypalobjects.com https://embed.tawk.to https://*.tawk.to https://cdn.jsdelivr.net;
              connect-src 'self' https://*.stripe.com https://api.stripe.com https://*.paypal.com https://www.paypalobjects.com https://*.tawk.to wss://*.tawk.to https://www.clarity.ms https://*.clarity.ms https://api.ingrammicro.com https://content.etilize.com https://store.veemost.com;
              frame-src 'self' https://*.stripe.com https://*.paypal.com https://www.paypalobjects.com https://tawk.to;
              object-src 'none';
              base-uri 'self';
              form-action 'self' https://*.stripe.com https://*.paypal.com;
              frame-ancestors 'none';
              upgrade-insecure-requests;
            `.replace(/\s{2,}/g, ' ').trim()
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
