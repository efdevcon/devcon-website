import { useStaticQuery, graphql } from 'gatsby'
import { PageContentType } from 'src/types/PageContentType'

export const useSiteNavigation = (lang: 'en' | 'es' = 'en'): Array<PageContentType> => {
  const data = useStaticQuery(graphql`
    query {
      english: allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___order] }
        filter: {
          fileAbsolutePath: { regex: "/pages/" }
          frontmatter: { showInMenu: { eq: true } }
          fields: { lang: { eq: "en" } }
        }
      ) {
        nodes {
          id
          fields {
            lang
            slug
            collection
            level
            parent
          }
          frontmatter {
            title
            template
            showInMenu
            order
          }
        }
      }
      spanish: allMarkdownRemark(
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
            level
            parent
          }
          frontmatter {
            title
            template
            showInMenu
            order
          }
        }
      }
    }
  `)

  const nodes = lang === 'en' ? data.english.nodes : data.spanish.nodes
  return nodes.filter((i: any) => i.fields.level === 0).map((i: any) => mapNodeToPage(i, nodes))
}

function mapNodeToPage(source: any, nodes?: any): PageContentType {
  return {
    title: source.frontmatter.title,
    template: source.frontmatter.template,
    showInMenu: source.frontmatter.showInMenu,
    order: source.frontmatter.order,
    path: source.fields.slug,
    lang: source.fields.lang,
    children: nodes.filter((i: any) => i.fields.parent === source.fields.slug).map((i: any) => mapNodeToPage(i, nodes)),
  }
}
