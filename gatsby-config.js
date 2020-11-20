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
        name: 'cms-content',
        path: `${__dirname}/src/content`,
      },
    },
    'gatsby-transformer-remark',
  ],
}
