const supportedLanguages = ['en', 'es']
const defaultLanguage = 'en'
const siteName = 'devcon.org'
const siteUrl = 'https://devcon.org'
const matomoSiteId = '8'
const matomoUrl = 'https://matomo.ethereum.org'

module.exports = {
  plugins: [
    'gatsby-plugin-root-import',
    'gatsby-plugin-typescript',
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteName,
        short_name: siteName,
        start_url: '/en/',
        background_color: '#fff',
        theme_color: '#663399',
        display: `standalone`,
        icon: `src/assets/images/devcon-icon.png`,
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
  ],
}
