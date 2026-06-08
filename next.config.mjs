/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.cityofimus.gov.ph",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/transparency", destination: "/full-disclosure", permanent: true },
      { source: "/hotlines", destination: "/contact#hotlines", permanent: true },
      { source: "/business", destination: "/forms", permanent: true },
      { source: "/services", destination: "/forms", permanent: true },
      { source: "/services/:path*", destination: "/forms", permanent: true },
      { source: "/full-disclosure/resolutions.html", destination: "/full-disclosure/resolutions", permanent: true },
      { source: "/full-disclosure/bids-and-awards", destination: "/full-disclosure/bids-awards", permanent: false },
    ];
  },
};

export default nextConfig;
