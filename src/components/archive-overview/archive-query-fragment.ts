import { graphql } from 'gatsby'

export const query = graphql`
  fragment ArchiveData on Query {
    videos: allMarkdownRemark(filter: { fields: { collection: { eq: "archive" }, lang: { eq: $language } } }) {
      nodes {
        id
        fields {
          lang
        }
        frontmatter {
          devconNum
          title
          description
          speakers
          url
          featured
        }
      }
    }
  }
`
