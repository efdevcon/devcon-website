import { useStaticQuery, graphql } from "gatsby"
import { PageContentType } from "src/types/baseContentType"

export const useSiteNavigation = (): Array<PageContentType> => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___order] }
        filter: {
          fileAbsolutePath: { regex: "/pages/" }
          frontmatter: { showInMenu: { eq: true } }
        }
      ) {
        nodes {
          id
          frontmatter {
            title
            showInMenu
            order
          }
        }
      }
    }
  `)

  return data.allMarkdownRemark.nodes.map((i: any) => {
    return {
      id: i.id,
      title: i.frontmatter.title,
      showInMenu: i.frontmatter.showInMenu,
      order: i.frontmatter.order,
    }
  })
}
