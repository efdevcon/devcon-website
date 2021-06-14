import { useStaticQuery, graphql } from 'gatsby'
import { DevconEdition } from 'src/types/DevconEdition'

export const useDevconEditions = (): Array<DevconEdition> => {
  const data = useStaticQuery(graphql`
    query {
      events: allMarkdownRemark(filter: { fields: { collection: { eq: "devcon" } } }) {
        nodes {
          id
          frontmatter {
            number
            title
            description
            location
            startDate
            endDate
            imageUrl
          }
          fields {
            collection
            slug
          }
        }
      }
    }
  `)

  const editions = data.events.nodes.map((i: any) => mapToDevconEdition(i)) as Array<DevconEdition>
  return editions.sort((a, b) => (a.number < b.number ? 1 : -1))
}

function mapToDevconEdition(source: any): DevconEdition {
  return {
    id: source.id,
    number: source.frontmatter.number,
    title: source.frontmatter.title,
    description: source.frontmatter.description,
    location: source.frontmatter.location,
    startDate: new Date(source.frontmatter.startDate),
    endDate: new Date(source.frontmatter.endDate),
    imageUrl: source.frontmatter.imageUrl,
  }
}
