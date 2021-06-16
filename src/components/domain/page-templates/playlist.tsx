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

export default pageHOC(function PlaylistTemplate(data: any) {
  const playlist = mapToPlaylist(data.data.playlist)

  return (
    <div className={css['container']}>
      <SEO />
      <Header />

      <PageHero title='' />

      <div className="section">
        <div className="content">
          <PlaylistHeader playlist={playlist} />
        </div>
      </div>

      <Footer />
    </div>
  )
})

export const query = graphql`
  query($slug: String!, $language: String!) {
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
        videos
      }
      fields {
        collection
        slug
      }
    }
  }
`
