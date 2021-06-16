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
            categories
            curators
            videos
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

export function mapToPlaylist(source: any): Playlist {
  return {
    id: source.id,
    slug: source.fields.slug,
    title: source.frontmatter.title,
    description: source.frontmatter.description,
    imageUrl: source.frontmatter.imageUrl,
    curators: source.frontmatter.curators,
    categories: source.frontmatter.categories,
    videoCount: source.frontmatter.videos.length,
    videos: [] // properly map/resolve to archive videos
  }
}
