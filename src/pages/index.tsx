import React, { useMemo } from 'react'
import { HorizontalLayout } from 'src/components/layouts/horizontal-layout'
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
  const events = useMemo(() => ToEventData(data), [data])
  const meetups = useMemo(() => ToMeetupData(data), [data])
  const dips = useMemo(() => ToDIPData(data), [data])
  const faqs = useMemo(() => ToFaqData(data), [data])
  const videos = useMemo(() => ToArchiveData(data), [data])
  const whatIsDevcon = {
    title: data.whatIsDevcon ? data.whatIsDevcon.nodes[0]?.frontmatter.title : '',
    body: data.whatIsDevcon ? data.whatIsDevcon?.nodes[0]?.html : '',
  }
  const messageFromDeva = {
    title: data.messageFromDeva ? data.messageFromDeva.nodes[0]?.frontmatter.title : '',
    body: data.messageFromDeva ? data.messageFromDeva?.nodes[0]?.html : '',
  }

  return (
    <>
      <SEO />
      <HorizontalLayout links={ToLinks(data.navigationData.nodes, 'road-to-devcon')}>
        <Intro
          title={intl.formatMessage({ id: 'rtd' })}
          icon={
            <div style={{ marginTop: '-3px' }}>
              <IconRoad width="1.4em" height="1.4em" className="override" />
            </div>
          }
          whatIsDevcon={whatIsDevcon}
        />

        <MessageFromDeva title={messageFromDeva.title} messageFromDeva={messageFromDeva.body} />

        <Blog title={intl.formatMessage({ id: 'rtd_get_informed' })} />

        <Participate title={intl.formatMessage({ id: 'rtd_participate' })} events={events} meetups={meetups} />

        <Contribute title={intl.formatMessage({ id: 'rtd_contribute' })} dips={dips} applyScrollLock />

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
    messageFromDeva: allMarkdownRemark(
      filter: {
        frontmatter: { title: { in: ["Message from Deva", "Mensaje de Deva"] } }
        fields: { lang: { eq: $language } }
      }
    ) {
      nodes {
        html
        frontmatter {
          title
        }
      }
    }
    whatIsDevcon: allMarkdownRemark(
      filter: {
        frontmatter: { title: { in: ["What is Devcon", "Que es Devcon"] } }
        fields: { lang: { eq: $language } }
      }
    ) {
      nodes {
        html
        frontmatter {
          title
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
