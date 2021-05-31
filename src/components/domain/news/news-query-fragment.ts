import { graphql } from 'gatsby'

export const query = graphql`
  fragment NewsData on Query {
    newsData: allMarkdownRemark(
      filter: { 
        fields: { lang: { in: [$language, "tweets", "blog-posts"] }, collection: { eq: "news" } } 
      }, 
      sort: { fields: frontmatter___date, order: ASC },
      limit: $limit
      skip: $skip
    ) {
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

  fragment NewsDataInline on Query {
    newsDataInline: allMarkdownRemark(
      filter: { 
        fields: { lang: { in: [$language, "tweets", "blog-posts"] }, collection: { eq: "news" } } 
      }, 
      sort: { fields: frontmatter___date, order: DESC },
      limit: 10
    ) {
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
      filter: { fields: { collection: { eq: "news" }, lang: { eq: $language } } }
      limit: 1
      sort: { fields: frontmatter___date, order: ASC }
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
    newsData: allMarkdownRemark(
      filter: { fields: { slug: { eq: $slug }, lang: { eq: $language }, collection: { eq: "news" } } }
    ) {
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
