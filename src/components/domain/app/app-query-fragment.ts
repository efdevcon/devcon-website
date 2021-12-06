import { graphql } from 'gatsby'

export const query = graphql`
  fragment EventData on Query {
    speakers: allMarkdownRemark(filter: { fields: { collection: { eq: "speakers" } } }) {
      nodes {
        frontmatter {
          id
        }
      }
    }
    sessions: allMarkdownRemark(filter: { fields: { collection: { eq: "sessions" } } }) {
      nodes {
        frontmatter {
          id
        }
      }
    }
    rooms: allMarkdownRemark(filter: { fields: { collection: { eq: "rooms" } } }) {
      nodes {
        frontmatter {
          id
        }
      }
    }
  }
`

/*
    sessions: allMarkdownRemark(filter: { fields: { collection: { eq: "sessions" } } }) {
      nodes {
        frontmatter {
          code
        }
      }
    }
*/