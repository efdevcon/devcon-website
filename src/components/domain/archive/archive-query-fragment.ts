import { graphql } from 'gatsby'

export const query = graphql`
  fragment VideoData on Query {
    video: allMarkdownRemark(
      filter: { fields: { slug: { eq: $slug }, collection: { eq: "videos" } } }
    ) {
      nodes {
        fields { 
          id
          slug
        }
        frontmatter {
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
          profiles {
            id
            name
            lang
            description
            imageUrl
            role
            slug
          }
        }
      }
    }
  }

  fragment VideoPlaylists on Query {
    playlists: allMarkdownRemark(
      filter: {frontmatter: {archiveVideos: {elemMatch: {slug: {eq: $slug }}}}}
    ) {
      nodes {
        id
        fields {
          collection
        }
        frontmatter {
          title
          description
          imageUrl
          categories
          curators
          profiles {
            id
            name
            lang
            description
            imageUrl
            role
            slug
          }
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
      }
    }
  }
`