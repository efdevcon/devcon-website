import React from 'react'
import { SEO } from 'src/components/domain/seo'
import { graphql } from 'gatsby'
import { pageHOC } from 'src/context/pageHOC'
import Archive from 'src/components/common/layouts/archive'

export default pageHOC(function Index({ data }: any) {
  return (
    <Archive>
      <SEO />
      <div>Hello Archive</div>
    </Archive>
  )
})

export const query = graphql`
  query ($language: String!) {
    ...NavigationData
    ...NewsDataInline
    ...Notification
  }
`
