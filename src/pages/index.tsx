import React from 'react'
import { useIntl } from 'gatsby-plugin-intl'
import Default from 'src/components/layouts/default'
import { SEO } from 'src/components/common/seo'
import { BlogOverview } from 'src/components/blog-overview'
import { graphql } from 'gatsby'
// import { News } from 'src/components/news'

export default function Index({ data }: any) {
  const intl = useIntl()

  return (
    <Default footerData={data.footer}>
      <SEO />

      <h2>{intl.formatMessage({ id: 'journey' })}</h2>
      <div>{intl.formatMessage({ id: 'description' })}</div>

      {/* <News /> */}
      <BlogOverview />
    </Default>
  )
}

export const query = graphql`
  query($language: String!) {
    ...FooterData
  }
`
