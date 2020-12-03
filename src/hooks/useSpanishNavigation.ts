import { useStaticQuery, graphql } from 'gatsby'
import { PageContentType } from 'src/types/baseContentType'

export const useSpanishNavigation = (): Array<PageContentType> => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___order] }
        filter: {
          fileAbsolutePath: { regex: "/pages/" }
          frontmatter: { showInMenu: { eq: true } }
          fields: { lang: { eq: "es" } }
        }
      ) {
        nodes {
          id
          fields {
            lang
            slug
            collection
          }
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
      path: i.fields.slug,
      lang: i.fields.lang,
    }
  })
}
