import { graphql } from 'gatsby'

export const query = graphql`
  fragment Tags on Query {
    tags: markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        tags
        tagItems(language: $language) { 
          id
          slug
          title
        }
      }
    }
  }
`
