import { graphql, useStaticQuery } from 'gatsby'

export default () =>
  useStaticQuery(graphql`
    query FooterQuery {
      allMarkdownRemark(filter: { fields: { collection: { eq: "footer" } } }) {
        nodes {
          id
          frontmatter {
            title
            highlightedLinks {
              url
              title
              type
            }
            leftLinks {
              url
              title
              type
            }
            rightLinks {
              url
              title
              type
            }
            bottomLinks {
              url
              title
              type
            }
          }
        }
      }
    }
  `)
