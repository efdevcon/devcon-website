import { graphql } from 'gatsby'

export const query = graphql`
  fragment FAQs on Query {
    faqs: allMarkdownRemark(filter: { fields: { collection: { eq: "faq" }, lang: { eq: $language } } }) {
      nodes {
        html
        frontmatter {
          title
          order
        }
        fields {
          lang
        }
      }
    }
  }
`
