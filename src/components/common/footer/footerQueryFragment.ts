import { graphql } from 'gatsby'

export const query = graphql`
  fragment FooterData on Query {
    footer: allMarkdownRemark(filter: { fields: { collection: { eq: "footer" } } }) {
      nodes {
        id
        frontmatter {
          highlightedLinks(language: $language) {
            url
            title
            type
          }
          leftLinks(language: $language) {
            url
            title
            type
          }
          rightLinks(language: $language) {
            url
            title
            type
          }
          bottomLinks(language: $language) {
            url
            title
            type
          }
        }
      }
    }
  }
`