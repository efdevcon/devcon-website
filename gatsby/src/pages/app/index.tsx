import React from 'react'
import { graphql } from 'gatsby'
import { pageHOC } from 'src/context/pageHOC'
import { App } from 'src/components/domain/app'

export default pageHOC((props: any) => {
  return <App {...props} />
})

export const query = graphql`
  query ($language: String!) {
    ...NavigationData
    ...Notification
    ...EventData
  }
`
