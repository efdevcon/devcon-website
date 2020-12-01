module.exports = {
  siteMetadata: {
    title: `Devcon 6`,
    description: `The annual conference for all Ethereum developers, researchers, thinkers, and makers.`,
  },
  plugins: [
    'gatsby-plugin-root-import',
    'gatsby-plugin-typescript',
    'gatsby-plugin-netlify-cms',
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
    'gatsby-transformer-remark',
  ],
}
