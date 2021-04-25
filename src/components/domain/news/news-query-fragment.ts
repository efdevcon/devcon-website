import { graphql } from 'gatsby'

export const query = graphql`
  fragment NewsData on Query {
    newsData: allMarkdownRemark(filter: { fields: { lang: { eq: $language }, collection: { eq: "news" } } }) {
      nodes {
        frontmatter {
          url
          title
          description
          date
          metadata
        }
      }
    }
  }
`
