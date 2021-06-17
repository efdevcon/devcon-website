import { useStaticQuery, graphql } from 'gatsby'
import { Playlist } from 'src/types/Playlist'
import { mapToPlaylist } from './usePlaylists'

export const useEfTalks = (): Playlist => {
  const data = useStaticQuery(graphql`
    query {
      playlist: markdownRemark(fields: {slug: {eq: "/archive/playlists/ef-talks/"}}) {
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
        }
      }
    }
  `)

  return mapToPlaylist(data.playlist)
}
