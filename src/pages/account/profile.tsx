import React from 'react'
import { graphql } from 'gatsby'

export default function Profile({ data }: any) {
  const isSSR = typeof window === "undefined"

  return (
    <div>
      <h2>User Profile</h2>
      {!isSSR && (
        console.log(isSSR)
      )}
    </div>
  )
}

export const query = graphql`
  query($language: String!) {
    ...NavigationData
    ...NewsData
  }
`
