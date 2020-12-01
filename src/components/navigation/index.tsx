import { graphql, useStaticQuery } from "gatsby"
import React from "react"

export function Navigation() {
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
  const pages = data.allMarkdownRemark.nodes

  return (
    <ul>
      {pages.map((i: any) => (
        <li key={i.id}>{i.frontmatter.title}</li>
      ))}
    </ul>
  )
}
