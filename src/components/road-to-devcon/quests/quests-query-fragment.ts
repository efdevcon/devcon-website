import { graphql } from 'gatsby'

export const query = graphql`
  fragment QuestsData on Query {
    quests: allMarkdownRemark(
      filter: { fields: { collection: { eq: "quests" }, lang: { eq: $language } } }
      sort: { fields: frontmatter___startDate, order: ASC }
    ) {
      nodes {
        fields {
          id
        }
        frontmatter {
          title
          issuer
          startDate
          endDate
          description
          image {
            childImageSharp {
              fluid(maxHeight: 1024, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
          url
        }
      }
    }
  }
`
