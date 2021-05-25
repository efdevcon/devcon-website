import { graphql } from 'gatsby'

export const query = graphql`
  fragment NewsData on Query {
    newsData: allMarkdownRemark(filter: { fields: { lang: { eq: $language }, collection: { eq: "news" } } }, sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          url
          title
          author
          date
          tags
        }
        rawMarkdownBody
      }
    }
  }

  fragment LatestNewsItem on Query {
    latestNewsItem: allMarkdownRemark(
      filter: {fields: {collection: {eq: "news"}, lang: {eq: $language}}}
      limit: 1
      sort: {fields: frontmatter___date, order: ASC}
    ) {
      nodes {
        frontmatter {
          title
          date
        }
      }
    }
  }

  fragment NewsItemData on Query {
    newsData: allMarkdownRemark(filter: { fields: { slug: { eq: $slug }, lang: { eq: $language }, collection: { eq: "news" } } }) {
      nodes {
        frontmatter {
          url
          title
          imageUrl
          author
          date
          tags
        }
      }
    }
  }
`