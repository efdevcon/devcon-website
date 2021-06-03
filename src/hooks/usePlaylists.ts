import { useStaticQuery, graphql } from 'gatsby'
import { Playlist } from 'src/types/Playlist'

export const usePlaylists = (): Array<Playlist> => {
  const data = useStaticQuery(graphql`
    query {
      playlists: allMarkdownRemark(filter: { fields: { collection: { eq: "playlists" } } }) {
        nodes {
          id
          frontmatter {
            title
            description
            imageUrl
            videos
            curators
          }
          fields {
            collection
            slug
          }
        }
      }
    }
  `)

  return data.playlists.nodes.map((i: any) => mapToPlaylist(i))
}

function mapToPlaylist(source: any): Playlist {
  return {
    id: source.id,
    title: source.frontmatter.title,
    description: source.frontmatter.description,
    imageUrl: source.frontmatter.imageUrl,
    curators: [],
    videos: []
  }
}
