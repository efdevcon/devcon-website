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

const offlinePages = ['/en/', '/es/', '/en/contact/', '/es/contact/']

module.exports = {
  siteMetadata: {
    siteUrl: siteUrl,
  },
  plugins: [
    'gatsby-plugin-root-import',
    'gatsby-plugin-typescript',
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-react-helmet',
    `gatsby-transformer-sharp`,
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
    //  NOTE: For the web app manifest to be cached, 'gatsby-plugin-manifest' needs to be before 'gatsby-plugin-offline'
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: offlinePages,
      },
    },
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
        name: 'blogs',
        path: `${__dirname}/src/content/blogs`,
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
    'gatsby-transformer-remark',
    'gatsby-transformer-json',
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        path: `${__dirname}/src/content/i18n`,
        languages: supportedLanguages,
        defaultLanguage: defaultLanguage,
        redirect: true,
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: require('sass'),
        cssLoaderOptions: {
          camelCase: false,
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
  ],
}
