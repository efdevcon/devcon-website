const withPWA = require('next-pwa')
const webpack = require('webpack')
// import { nanoid } from 'nanoid'
const { nanoid } = require('nanoid')
const getGeneratedPrecacheEntries = require('./precache')
const getStaticPrecacheEntries = require('./publicprecache.js')

const buildId = nanoid()
/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: () => buildId,
  pwa: {
    dest: '/public',
    // scope: '/',
    cacheOnFrontEndNav: true,
    // publicExcludes: ['!assets/images/**/*', '!assets/uploads/**/*', '!admin/**/*'],
    // buildExcludes: [/media\/.*$/],
    additionalManifestEntries: [...getGeneratedPrecacheEntries(buildId), ...getStaticPrecacheEntries({})],
    // mode: 'production',
    customWorkerDir: 'workbox',
    fallbacks: {
      image:
        'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    },
  },
  reactStrictMode: true,
  staticPageGenerationTimeout: 300,
  images: {
    domains: [
      'speak.devcon.org',
      'storage.googleapis.com',
      'avatars.githubusercontent.com',
      'camo.githubusercontent.com',
      'blog.ethereum.org',
      'img.youtube.com',
      'www.gravatar.com',
    ],
  },
  experimental: {
    images: {
      layoutRaw: true,
    },
  },
  // i18n: {
  //   locales: ['default', 'en', 'es'],
  //   defaultLocale: 'default',
  //   localeDetection: false,
  // },
  // trailingSlash: true,
  webpack: (config, { buildId }) => {
    return {
      ...config,
      plugins: [
        ...config.plugins,
        new webpack.DefinePlugin({
          'process.env.CONFIG_BUILD_ID': JSON.stringify(buildId),
        }),
      ],
      module: {
        ...config.module,
        rules: [
          {
            test: /\.svg$/,
            include: /images/,
            issuer: { not: /\.(css|scss|sass)$/ },
            use: [
              {
                loader: '@svgr/webpack',
                options: {
                  svgoConfig: {
                    plugins: [
                      {
                        name: 'preset-default',
                        params: {
                          overrides: {
                            removeViewBox: false,
                            cleanupIDs: false, // Critical to have this, otherwise svgs can start affecting each other
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
            include: /assets.icons/,
            issuer: { not: /\.(css|scss|sass)$/ },
            use: [
              {
                loader: '@svgr/webpack',
                options: {
                  icon: true,
                  svgProps: {
                    className: 'icon',
                  },
                  svgoConfig: {
                    plugins: [
                      {
                        name: 'preset-default',
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
          {
            test: /\.(glsl|vs|fs|vert|frag)$/,
            exclude: /node_modules/,
            use: ['raw-loader', 'glslify-loader'],
          },
          ...config.module.rules,
        ],
      },
    }
  },
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ]
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/devcon-0',
  //       destination: '/past-events',
  //       permanent: true,
  //     },
  //     {
  //       source: '/devcon-0/details',
  //       destination: '/past-events',
  //       permanent: true,
  //     },
  //     {
  //       source: '/devcon-1',
  //       destination: '/past-events',
  //       permanent: true,
  //     },
  //     {
  //       source: '/devcon-1/details',
  //       destination: '/past-events',
  //       permanent: true,
  //     },
  //     {
  //       source: '/devcon-2',
  //       destination: '/past-events',
  //       permanent: true,
  //     },
  //     {
  //       source: '/devcon-2/details',
  //       destination: '/past-events',
  //       permanent: true,
  //     },
  //     {
  //       source: '/devcon-3',
  //       destination: '/past-events',
  //       permanent: true,
  //     },
  //     {
  //       source: '/devcon-3/details',
  //       destination: '/past-events',
  //       permanent: true,
  //     },
  //     {
  //       source: '/devcon-4',
  //       destination: '/past-events',
  //       permanent: true,
  //     },
  //     {
  //       source: '/devcon-4/details',
  //       destination: '/past-events',
  //       permanent: true,
  //     },
  //     {
  //       source: '/devcon-5',
  //       destination: '/past-events',
  //       permanent: true,
  //     },
  //     {
  //       source: '/devcon-5/details',
  //       destination: '/past-events',
  //       permanent: true,
  //     },
  //     {
  //       source: '/agenda',
  //       destination: '/en/program',
  //       permanent: true,
  //     },
  //     {
  //       source: '/lightning-speakers',
  //       destination: '/en/program',
  //       permanent: true,
  //     },
  //     {
  //       source: '/workshops-and-breakouts',
  //       destination: '/en/program',
  //       permanent: true,
  //     },
  //     {
  //       source: '/call-for-participation',
  //       destination: '/en/applications',
  //       permanent: true,
  //     },
  //     {
  //       source: '/speakers',
  //       destination: '/en/applications',
  //       permanent: true,
  //     },
  //     {
  //       source: '/vi',
  //       destination: '/',
  //       permanent: true,
  //     },
  //     {
  //       source: '/zh',
  //       destination: '/',
  //       permanent: true,
  //     },
  //   ]
  // },
}

module.exports = (phase, { defaultConfig }) => {
  const config = {
    ...defaultConfig,
    ...nextConfig,
  }

  return withPWA(config)
}

// module.exports = nextConfig
