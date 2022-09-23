const withPWA = require('next-pwa')
const webpack = require('webpack')
// import { nanoid } from 'nanoid'
const { nanoid } = require('nanoid')

function getStaticPrecacheEntries() {
  // build list of manifest entries to precache content of public folder
  // ...
}

const getGeneratedPrecacheEntries = buildId => {
  // build list of page entries, using buildId as revision for HTML files and as part of the url for JSON files
  // ...
}

const pages = [
  {
    route: '/app',
    precacheHtml: false, // next-pwa already caches the home page
    precacheJson: false, // no props
  },
  {
    route: '/app/login',
    precacheHtml: false,
    precacheJson: true,
  },
  {
    route: '/app/schedule/',
    precacheHtml: true, // this is now the start url for A2HS
    precacheJson: true,
  },
  {
    route: '/denizens/',
    precacheHtml: false,
    precacheJson: true,
    // dynamicPages: getDenizenPages(),
  },
]

const buildId = nanoid()

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  generateBuildId: () => buildId,
  pwa: {
    dest: '/public',
    scope: '/app',
    cacheOnFrontEndNav: true,
    publicExcludes: ['!assets/images/**/*', '!assets/uploads/**/*', '!admin/**/*'],
    buildExcludes: [/media\/.*$/],
    additionalManifestEntries: getGeneratedPrecacheEntries(buildId),
    mode: 'production',
    customWorkerDir: 'workbox',
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
  i18n: {
    locales: ['default', 'en', 'es'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  trailingSlash: true,
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
  async redirects() {
    return [
      {
        source: '/devcon-0',
        destination: '/past-events',
        permanent: true,
      },
      {
        source: '/devcon-0/details',
        destination: '/past-events',
        permanent: true,
      },
      {
        source: '/devcon-1',
        destination: '/past-events',
        permanent: true,
      },
      {
        source: '/devcon-1/details',
        destination: '/past-events',
        permanent: true,
      },
      {
        source: '/devcon-2',
        destination: '/past-events',
        permanent: true,
      },
      {
        source: '/devcon-2/details',
        destination: '/past-events',
        permanent: true,
      },
      {
        source: '/devcon-3',
        destination: '/past-events',
        permanent: true,
      },
      {
        source: '/devcon-3/details',
        destination: '/past-events',
        permanent: true,
      },
      {
        source: '/devcon-4',
        destination: '/past-events',
        permanent: true,
      },
      {
        source: '/devcon-4/details',
        destination: '/past-events',
        permanent: true,
      },
      {
        source: '/devcon-5',
        destination: '/past-events',
        permanent: true,
      },
      {
        source: '/devcon-5/details',
        destination: '/past-events',
        permanent: true,
      },
      {
        source: '/agenda',
        destination: '/en/program',
        permanent: true,
      },
      {
        source: '/lightning-speakers',
        destination: '/en/program',
        permanent: true,
      },
      {
        source: '/workshops-and-breakouts',
        destination: '/en/program',
        permanent: true,
      },
      {
        source: '/call-for-participation',
        destination: '/en/applications',
        permanent: true,
      },
      {
        source: '/speakers',
        destination: '/en/applications',
        permanent: true,
      },
      {
        source: '/vi',
        destination: '/',
        permanent: true,
      },
      {
        source: '/zh',
        destination: '/',
        permanent: true,
      },
    ]
  },
})

module.exports = nextConfig
