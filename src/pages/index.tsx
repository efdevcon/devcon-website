import React from 'react'
import { HorizontalLayout, Page } from 'src/components/layouts/horizontal-layout'
import { Intro } from 'src/components/road-to-devcon/intro/Intro'
import { graphql } from 'gatsby'
import { useIntl } from 'gatsby-plugin-intl'
import { ToLinks } from 'src/context/query-mapper'
import { Link } from 'src/types/Link'

import { Contribute } from 'src/components/road-to-devcon/contribute'
import { ToDIPData } from 'src/components/dip-overview/queryMapper'
import { ToFaqData } from 'src/components/faq/queryMapper'
import { Ask } from 'src/components/road-to-devcon/ask'
import { Learn } from 'src/components/road-to-devcon/learn'
import { Participate } from 'src/components/road-to-devcon/participate'

export default function Index({ data }: any) {
  const intl = useIntl()
  const dips = ToDIPData(data.dips)
  const faqs = ToFaqData(data)

  return (
    <HorizontalLayout links={ToLinks(data.navigationData.nodes, 'road-to-devcon')}>
      <Intro title={intl.formatMessage({ id: 'rtd' })} />

      <Page title={intl.formatMessage({ id: 'rtd_get_informed' })}>
        <h1>Unstructured example - can render whatever we want in pages</h1>
        <div
          style={{ height: '500px', width: '500px', marginLeft: '150px', marginTop: '200px', background: 'pink' }}
        ></div>
      </Page>

      <Participate title={intl.formatMessage({ id: 'rtd_participate' })} />

      <Contribute title={intl.formatMessage({ id: 'rtd_contribute' })} dips={dips} />

      <Learn title={intl.formatMessage({ id: 'rtd_learn' })} />

      <Ask title={intl.formatMessage({ id: 'rtd_ask_deva' })} faqs={faqs} />

      <Page title={intl.formatMessage({ id: 'rtd_invite' })}>
        <h1>Page 7</h1>
      </Page>
    </HorizontalLayout>
  )
}

export const query = graphql`
  query($language: String!) {
    navigationData: allMarkdownRemark(
      filter: { frontmatter: { title: { eq: "road-to-devcon" } }, fields: { collection: { eq: "navigation" } } }
    ) {
      nodes {
        frontmatter {
          title
          links(language: $language) {
            title
            type
            url
            links {
              title
              type
              url
            }
          }
        }
      }
    }
    ...DipsData
    ...Categories
    ...FAQs
  }
`
