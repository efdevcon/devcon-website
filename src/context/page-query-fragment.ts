import { graphql } from 'gatsby'

export const query = graphql`
  fragment Page on Query {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        description
        template
        translationVerified
        tags
        tagItems(language: $language) { 
          id
          slug
          title
        }
      }
      fields {
        lang
        id
        collection
        slug
      }
      html
    }
  }
`
