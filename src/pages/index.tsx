import React from 'react'
import { HorizontalLayout, Page } from 'src/components/layouts/horizontal-layout'
import { Intro } from 'src/components/road-to-devcon/intro/Intro'
import { graphql } from 'gatsby'
import { useIntl } from 'gatsby-plugin-intl'
import { ToLinks } from 'src/context/query-mapper'

import { Contribute } from 'src/components/road-to-devcon/contribute'
import { ToDIPData } from 'src/components/dip-overview/queryMapper'
import { ToFaqData } from 'src/components/faq/queryMapper'
import { Ask } from 'src/components/road-to-devcon/ask'
import { Learn } from 'src/components/road-to-devcon/learn'
import { Participate } from 'src/components/road-to-devcon/participate'
import { Blog } from 'src/components/road-to-devcon/blog'
import { MessageFromDeva } from 'src/components/road-to-devcon/message-from-deva'
import { Invite } from 'src/components/road-to-devcon/invite'
import { ToEventData, ToMeetupData } from 'src/components/events-overview/queryMapper'
import { ToArchiveData } from 'src/components/archive-overview/queryMapper'
import { SEO } from 'src/components/common/seo'
import IconRoad from 'src/assets/icons/road.svg'

export default function Index({ data }: any) {
  const intl = useIntl()
  const events = ToEventData(data)
  const meetups = ToMeetupData(data)
  const dips = ToDIPData(data.dips)
  const faqs = ToFaqData(data)
  const videos = ToArchiveData(data)

  return (
    <>
      <SEO />
      <HorizontalLayout links={ToLinks(data.navigationData.nodes, 'road-to-devcon')}>
        <Intro title={intl.formatMessage({ id: 'rtd' })} />

        <MessageFromDeva customIndex={<IconRoad />} title={intl.formatMessage({ id: 'rtd_message_from_deva' })} />

        <Blog title={intl.formatMessage({ id: 'rtd_get_informed' })} />

        <Participate title={intl.formatMessage({ id: 'rtd_participate' })} events={events} meetups={meetups} />

        <Contribute title={intl.formatMessage({ id: 'rtd_contribute' })} dips={dips} />

        <Learn title={intl.formatMessage({ id: 'rtd_learn' })} videos={videos} />

        <Ask title={intl.formatMessage({ id: 'rtd_ask_deva' })} faqs={faqs} />

        <Invite title={intl.formatMessage({ id: 'rtd_invite' })} />
      </HorizontalLayout>
    </>
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
    ...EventsData
    ...MeetupData
    ...DipsData
    ...ArchiveData
    ...Categories
    ...FAQs
  }
`
