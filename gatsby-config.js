module.exports = {
  siteMetadata: {
    title: `Devcon 6`,
    description: `The annual conference for all Ethereum developers, researchers, thinkers, and makers.`,
  },
  plugins: [
    "gatsby-plugin-root-import",
    "gatsby-plugin-typescript",
    "gatsby-plugin-netlify-cms",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/content/pages`,
      },
    },
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        cssLoaderOptions: {
          camelCase: false,
        },
      },
    },
  ],
}
