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
            archiveVideos {
              id
              slug
              title
              description
              edition
              youtubeUrl
              ipfsHash
              expertise
              type
              track
              tags
              speakers
            }
          }
          fields {
            collection
            slug
            id
          }
        }
      }
    }
  `)

  return data.playlists.nodes.map((i: any) => mapToPlaylist(i))
}

export function mapToPlaylist(source: any): Playlist {
  return {
    id: source.fields.id,
    slug: source.fields.slug,
    title: source.frontmatter.title,
    description: source.frontmatter.description,
    imageUrl: source.frontmatter.imageUrl,
    curators: source.frontmatter.curators,
    categories: source.frontmatter.categories,
    videoCount: source.frontmatter.archiveVideos.length,
    videos: source.frontmatter.archiveVideos
  }
}