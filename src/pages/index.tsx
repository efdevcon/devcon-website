import React from 'react'
import { HorizontalLayout, Page } from 'src/components/layouts/horizontal-layout'
import { Intro } from 'src/components/road-to-devcon/intro/Intro'
import { graphql } from 'gatsby'
import { useIntl } from 'gatsby-plugin-intl'
import { ToLinks } from 'src/context/query-mapper'
import { Link } from 'src/types/Link'

export default (props: any) => {
  const intl = useIntl()

  return (
    <HorizontalLayout links={ToLinks(props.data.navigationData.nodes, 'road-to-devcon')}>
      <Intro title={intl.formatMessage({ id: 'rtd' })} />

      <Page title={intl.formatMessage({ id: 'rtd_get_informed' })}>
        <h1>Unstructured example - can render whatever we want in pages</h1>
        <div
          style={{ height: '500px', width: '500px', marginLeft: '150px', marginTop: '200px', background: 'pink' }}
        ></div>
      </Page>
      <Page title={intl.formatMessage({ id: 'rtd_participate' })}>
        <h1>Page 3</h1>
      </Page>
      <Page title={intl.formatMessage({ id: 'rtd_contribute' })}>
        <h1>Page 4</h1>
      </Page>
      <Page title={intl.formatMessage({ id: 'rtd_learn' })}>
        <h1>Page 5</h1>
      </Page>
      <Page title={intl.formatMessage({ id: 'rtd_message_from_deva' })}>
        <h1>Page 6</h1>
      </Page>
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
  }
`
