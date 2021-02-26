import React from 'react'
import { PageContent, Page } from 'src/components/layouts/horizontal-layout'
import { useIntl } from 'gatsby-plugin-intl'
import css from './participate.module.scss'
import { EventOverview } from 'src/components/events-overview'
import { Tabs } from 'src/components/common/tabs'
import { Tab } from 'src/components/common/tabs/Tabs'
import { MeetupOverview } from 'src/components/events-overview/MeetupOverview'

export const Participate = React.forwardRef((props: any, ref) => {
  const intl = useIntl()

  return (
    <Page {...props} ref={ref}>
      <div className={css['background']}></div>
      <PageContent backgroundText={intl.formatMessage({ id: 'rtd_community_events' })}>
        <div className={css['container']}>
          <Tabs>
            <Tab title='Events'>
              <EventOverview data={props.events} />
            </Tab>
            <Tab title='Meetups'>
              <MeetupOverview data={props.meetups} />
            </Tab>
          </Tabs>          
        </div>
      </PageContent>
    </Page>
  )
})
