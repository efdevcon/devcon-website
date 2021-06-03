import { useStaticQuery, graphql } from 'gatsby'
import { DevconEvent } from 'src/types/DevconEvent'

export const useDevconEvents = (): Array<DevconEvent> => {
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

  return data.events.nodes.map((i: any) => mapToDevconEvent(i))
}

function mapToDevconEvent(source: any): DevconEvent {
  return {
    id: source.id,
    number: source.frontmatter.number,
    title: source.frontmatter.title,
    description: source.frontmatter.description,
    location: source.frontmatter.location,
    startDate: new Date(source.frontmatter.startDate),
    endDate: new Date(source.frontmatter.endDate),
    imageUrl: source.frontmatter.imageUrl
  }
}
