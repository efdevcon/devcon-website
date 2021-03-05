import React from 'react'
import { PageContent, Page } from 'src/components/layouts/horizontal-layout'
import { useIntl } from 'gatsby-plugin-intl'
import css from './participate.module.scss'
import { EventOverview } from 'src/components/events-overview'
import { Tabs } from 'src/components/common/tabs'
import { Tab } from 'src/components/common/tabs/Tabs'
import { MeetupOverview } from 'src/components/events-overview/MeetupOverview'

import IconPlus from 'src/assets/icons/plus.svg'
import { LINK_SUBMIT_EVENT } from 'src/utils/constants'

export const Participate = React.forwardRef((props: any, ref) => {
  const intl = useIntl()

  return (
    <Page {...props} ref={ref}>
      <div className={css['background']}></div>
      <PageContent transparent backgroundText={intl.formatMessage({ id: 'rtd_community_events' })}>
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
          </Tabs>
          <div className={css['footer']}>
            <a href={LINK_SUBMIT_EVENT}>
              <span>{intl.formatMessage({ id: 'rtd_submit_community_event' })}</span>
              <span><IconPlus /></span>
            </a>
          </div>
        </div>
      </PageContent>
    </Page>
  )
})
