import { useStaticQuery, graphql } from 'gatsby'
import { DIP } from 'src/types/dip'

export const useDIPs = (): Array<DIP> => {
  const data = useStaticQuery(graphql`
    query {
      dips: allMarkdownRemark(filter: { fields: { collection: { eq: "dips" } } }, sort: { fields: frontmatter___DIP }) {
        nodes {
          frontmatter {
            DIP
            Title
            Status
            Themes
            Discussion
            Authors
            Resources_Required
            Tags
          }
          fields {
            slug
          }
        }
      }
    }
  `)

  return data.dips.nodes.map((i: any) => mapToDIP(i))
}

function mapToDIP(source: any): DIP {
  return {
    number: source.frontmatter.DIP,
    title: source.frontmatter.Title,
    status: source.frontmatter.Status,
    themes: source.frontmatter.Themes ? source.frontmatter.Themes.split(',') : [],
    tags: source.frontmatter.Tags ? source.frontmatter.Tags.split(',') : [],
    authors: source.frontmatter.Authors ? source.frontmatter.Authors.split(',') : [],
    resources: source.frontmatter.Resources,
    discussion: source.frontmatter.Discussion,
    created: new Date(source.frontmatter.Created),
    body: source.html,
    slug: source.fields.slug
  }
}
