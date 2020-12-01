import { useStaticQuery, graphql } from "gatsby"
import { SiteMetadata } from "src/types/siteMetadata"

export const useSiteNavigation = (lang: "en" | "es" = "en"): SiteMetadata => {
  const { site } = useStaticQuery(
    graphql`
      query SiteNavigation {
        allMarkdownRemark {
          edges {
            node {
              id
              frontmatter {
                title
                showInMenu
                order
              }
            }
          }
        }
      }
    `
  )

  return site.siteMetadata
}
