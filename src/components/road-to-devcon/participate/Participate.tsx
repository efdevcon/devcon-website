import React from 'react'
import { PageContent, Page } from 'src/components/layouts/horizontal-layout'
import { useIntl } from 'gatsby-plugin-intl'
import css from './participate.module.scss'
import { EventOverview } from 'src/components/events-overview'
import { Tabs } from 'src/components/common/tabs'
import { Tab } from 'src/components/common/tabs/Tabs'
import { MeetupOverview } from 'src/components/events-overview/MeetupOverview'
import { Grants } from 'src/components/events-overview/GrantOverview'

import IconPlus from 'src/assets/icons/plus.svg'
import { LINK_SUBMIT_EVENT } from 'src/utils/constants'
import { Checkpoint } from '../checkpoint'
import { graphql, useStaticQuery } from 'gatsby'

export const Participate = React.forwardRef((props: any, ref) => {
  const intl = useIntl()
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativePath: { in: ["participate_background.png"] } }) {
        nodes {
          childImageSharp {
            fluid(maxWidth: 2100, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  `)
  const bg = data.allFile.nodes[0]?.childImageSharp?.fluid?.src ?? 'src/assets/images/participate_background.webp'

  return (
    <Page {...props} ref={ref}>
      <div className={css['background']} style={{ backgroundImage: `url(${bg})` }}></div>
      <PageContent transparent inverted backgroundText={intl.formatMessage({ id: 'rtd_community_events' })}>
        <div className={css['container']}>
          <Tabs>
            <Tab title={intl.formatMessage({ id: 'rtd_events' })}>
              <div className={css['content']}>
                <EventOverview data={props.events} />
              </div>
            </Tab>
            <Tab title={intl.formatMessage({ id: 'rtd_meetups' })}>
              <div className={css['content']}>
                <MeetupOverview data={props.meetups} />
              </div>
            </Tab>
            <Tab title={intl.formatMessage({ id: 'rtd_grants' })}>
              <Grants />
            </Tab>
          </Tabs>
          <div className={css['footer']}>
            <a href={LINK_SUBMIT_EVENT} target="_blank" rel="noopener noreferrer">
              <span>{intl.formatMessage({ id: 'rtd_submit_community_event' })}</span>
              <span>
                <IconPlus />
              </span>
            </a>
          </div>
        </div>

        <Checkpoint
          number="02"
          description={intl.formatMessage({ id: 'rtd_checkpoint_2' })}
          action=""
          markerClassName={css['marker']}
        />
      </PageContent>
    </Page>
  )
})
