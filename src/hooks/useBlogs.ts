import { useStaticQuery, graphql } from 'gatsby'
import { BlogPost } from 'src/types/BlogPost'

export const useBlogs = (): Array<BlogPost> => {
  const data = useStaticQuery(graphql`
    query {
      blogs: allMarkdownRemark(
        filter: { fields: { collection: { eq: "blogs" } } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        nodes {
          frontmatter {
            title
            date
            author
            permaLink
            imageUrl
            image {
              childImageSharp {
                fluid(maxHeight: 1024, quality:80) {
                  src
                }
              }
            }
          }
          fields {
            slug
          }
          html
        }
      }
    }
  `)

  return data.blogs.nodes.map((i: any) => mapToBlog(i))
}

function mapToBlog(source: any): BlogPost {
  return {
    title: source.frontmatter.title,
    date: new Date(source.frontmatter.date),
    author: source.frontmatter.author,
    body: source.html,
    slug: source.fields.slug,
    permaLink: source.frontmatter.permaLink,
    imageUrl: source.frontmatter.image ? source.frontmatter.image.childImageSharp.fluid.src : source.frontmatter.imageUrl
  }
}
