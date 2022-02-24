/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['speak.devcon.org']
  },
  i18n: {
    locales: ["default", "en", "es"],
    defaultLocale: "default",
    localeDetection: false,
  },
  trailingSlash: true,
  webpack: (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          {
            test: /\.svg$/,
            include: /images/,
            issuer: { not: /\.(css|scss|sass)$/ },
            use: [
              {
                loader: "@svgr/webpack",
                options: {
                  svgoConfig: {
                    plugins: [
                      {
                        name: "preset-default",
                        params: {
                          overrides: {
                            removeViewBox: false,
                          },
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
          // Separate config for icon loading
          {
            test: /\.svg$/,
            include: /icons/,
            issuer: { not: /\.(css|scss|sass)$/ },
            use: [
              {
                loader: "@svgr/webpack",
                options: {
                  icon: true,
                  svgProps: {
                    className: "icon",
                  },
                  svgoConfig: {
                    plugins: [
                      {
                        name: "preset-default",
                        params: {
                          overrides: {
                            removeViewBox: false,
                          },
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
          ...config.module.rules,
        ],
      },
    };
  },
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
};

module.exports = nextConfig;
