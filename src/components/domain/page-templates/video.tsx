import React from 'react'
import { graphql } from 'gatsby'
import { pageHOC } from 'src/context/pageHOC'
import { Video } from 'src/components/domain/archive'

export default pageHOC(function ArchiveVideoTemplate(data: any) {
  console.log('PAGE BEING CREATED')
  return <Video />
})

export const query = graphql`
  query ($slug: String!, $language: String!) {
    ...Page
    ...Notification
    ...NavigationData
  }
`
