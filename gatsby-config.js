const { createProxyMiddleware } = require('http-proxy-middleware')
const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = 'https://devcon.org',
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env
const isNetlifyProduction = NETLIFY_ENV === 'production'
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

const title = 'Devcon'
const defaultLanguage = 'en'
const secondaryLanguage = 'es'
const supportedLanguages = [defaultLanguage, secondaryLanguage]

const matomoSiteId = '8'
const matomoUrl = 'https://matomo.ethereum.org'

const offlinePages = ['/en', '/es', '/en/contact', '/es/contact']

module.exports = {
  siteMetadata: {
    siteUrl: siteUrl,
  },
  developMiddleware: app => {
    app.use(
      '/api/',
      createProxyMiddleware({
        target: 'http://localhost:9000',
        pathRewrite: {
          '^/\\.netlify/functions': '',
        },
      })
    )
  },
  plugins: [
    'gatsby-plugin-root-import',
    'gatsby-plugin-typescript',
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-react-helmet',
    `gatsby-transformer-sharp`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: ['/admin'],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            host: siteUrl,
            sitemap: siteUrl + '/sitemap.xml',
            policy: [{ userAgent: '*' }],
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-ts-config',
      options: {
        configDir: './src/gatsby',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: title,
        short_name: title,
        description: 'The annual conference for all Ethereum developers, researchers, thinkers, and makers.',
        lang: defaultLanguage,
        start_url: '/',
        background_color: '#fff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: `src/assets/images/devcon-icon.png`,
        localize: [
          {
            start_url: `/${secondaryLanguage}/`,
            lang: secondaryLanguage,
            name: title,
            short_name: title,
            description:
              'La conferencia anual para todos los desarrolladores, investigadores, pensadores y creadores de Ethereum.',
          },
        ],
      },
    },
    'gatsby-plugin-remove-serviceworker',
    //  NOTE: For the web app manifest to be cached, 'gatsby-plugin-manifest' needs to be before 'gatsby-plugin-offline'
    // {
    //   resolve: 'gatsby-plugin-offline',
    //   options: {
    //     precachePages: offlinePages,
    //   },
    // },
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: matomoSiteId,
        matomoUrl: matomoUrl,
        siteUrl,
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: 'https://ethereum.us7.list-manage.com/subscribe/post?u=bfdb1ffb0f71e3a27b9d96aed&amp;id=013a6fa362',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/content/pages`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'faq',
        path: `${__dirname}/src/content/faq`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'categories',
        path: `${__dirname}/src/content/categories`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'dips',
        path: `${__dirname}/src/content/dips`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'dip-contributors',
        path: `${__dirname}/src/content/dips/contributors.json`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'news',
        path: `${__dirname}/src/content/news`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'navigation',
        path: `${__dirname}/src/content/navigation`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'links',
        path: `${__dirname}/src/content/links`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'headers',
        path: `${__dirname}/src/content/headers`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'news',
        path: `${__dirname}/src/content/news`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'tags',
        path: `${__dirname}/src/content/tags`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'sections',
        path: `${__dirname}/src/content/sections`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'events',
        path: `${__dirname}/src/content/events`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'meetups',
        path: `${__dirname}/src/content/meetups`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'archive',
        path: `${__dirname}/src/content/archive`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              beginMarker: `[[`,
              endMarker: `]]`,
              width: 600,
              related: false,
              containerClass: 'embedded-video-container',
            },
          },
          {
            resolve: 'gatsby-transformer-remark-frontmatter',
            options: {
              whitelist: ['left', 'right'],
            },
          },
        ],
      },
    },
    'gatsby-remark-responsive-iframe',
    'gatsby-transformer-json',
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        path: `${__dirname}/src/content/i18n`,
        languages: supportedLanguages,
        defaultLanguage: defaultLanguage,
        redirect: false,
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: require('sass'),
        cssLoaderOptions: {
          esModule: false,
          modules: {
            namedExport: false,
            exportLocalsConvention: 'asIs',
          },
        },
      },
    },
    // Used to load svg files as React components, specifically useful for icons (without this plugin they get loaded as dataurls, meaning we lose the properties of inline svg)
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /icons/,
          options: {
            props: {
              className: 'icon', // Need a class to target for default icon styling
            },
          },
        },
      },
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://blog.ethereum.org/feed/category/devcon.xml`,
        name: `DevconBlog`,
        // Documentation: https://github.com/bobby-brennan/rss-parser#readme
        parserOption: {
          customFields: {
            item: ['efblog:image', 'description'],
          },
        },
      },
    },
  ],
}
// 
// 
