import React from 'react'
import { graphql } from 'gatsby'
import { pageHOC } from 'src/context/pageHOC'
import css from './playlist.module.scss'
import { PageHero } from 'src/components/common/page-hero'
import { Footer } from 'src/components/common/layouts/footer'
import { SEO } from '../seo'
import { Header } from 'src/components/common/layouts/header'
import { PlaylistHeader } from '../archive/playlists/Header'
import { mapToPlaylist } from 'src/hooks/usePlaylists'
import { ArchiveVideo } from 'src/types/ArchiveVideo'
import { VideoCard } from '../archive/playlists'

export default pageHOC(function PlaylistTemplate(data: any) {
  const playlist = mapToPlaylist(data.data.playlist)

  return (
    <div className={css['container']}>
      <SEO />
      <Header />

      <PageHero title="" />

      <div className="section">
        <div className="content">
          <PlaylistHeader playlist={playlist} />

          <div className={css['videos']}>
            <div className={css['list-view']}>
              {playlist.videos.map((i: ArchiveVideo) => {
                return <VideoCard key={i.id} video={i} playlist={playlist} horizontal showDescription />
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
})

export const query = graphql`
  query ($slug: String!, $language: String!) {
    ...Page
    ...Notification
    ...NavigationData
    playlist: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
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
`
