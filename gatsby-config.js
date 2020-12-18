import EN from 'src/content/i18n/en.json';
import ES from 'src/content/i18n/es.json';

const siteUrl = 'https://devcon.org'
const defaultLanguage = 'en'
const secondaryLanguage = 'es'
const supportedLanguages = [defaultLanguage, secondaryLanguage]

const matomoSiteId = '8'
const matomoUrl = 'https://matomo.ethereum.org'

const offlinePages = ['/en/', '/es/', '/en/contact/', '/es/contact/']

module.exports = {
  plugins: [
    'gatsby-plugin-root-import',
    'gatsby-plugin-typescript',
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-ts-config',
      options: {
        configDir: './src/gatsby',
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: EN.title,
        short_name: EN.title,
        description: EN.description,
        lang: defaultLanguage,
        start_url: `/${defaultLanguage}/`,
        background_color: '#fff',
        theme_color: '#663399',
        display: `standalone`,
        icon: `src/assets/images/devcon-icon.png`,
        localize: [
          {
            start_url: `/${secondaryLanguage}/`,
            lang: secondaryLanguage,
            name: ES.title,
            short_name: ES.title,
            description: ES.description,
          },
        ],
      },
    },
    //  NOTE: For the web app manifest to be cached, 'gatsby-plugin-manifest' needs to be before 'gatsby-plugin-offline'
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: offlinePages,
      },
    },
    {
      resolve: "gatsby-plugin-matomo",
      options: {
        siteId: matomoSiteId,
        matomoUrl: matomoUrl,
        siteUrl,
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
        name: 'dips',
        path: `${__dirname}/src/content/dips`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blogs',
        path: `${__dirname}/src/content/blogs`,
      },
    },
    'gatsby-transformer-remark',
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
