import React from 'react'
import { graphql } from 'gatsby'
import { pageHOC } from 'src/context/pageHOC'
import { Video } from 'src/components/domain/archive'
import { mapToArchiveVideo } from 'src/hooks/useArchiveVideos'
import { mapToPlaylist } from 'src/hooks/usePlaylists'

export default pageHOC(function ArchiveVideoTemplate(props: any) {
  const video = mapToArchiveVideo(props.data.video.nodes[0])
  const playlists = props.data.playlists && props.data.playlists.nodes.map(mapToPlaylist)

  return <Video video={video} playlists={playlists} />
})

export const query = graphql`
  query ($slug: String!, $language: String!) {
    ...Page
    ...Notification
    ...NavigationData
    ...VideoData
    ...VideoPlaylists
  }
`
