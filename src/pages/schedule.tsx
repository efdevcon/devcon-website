import React from 'react'
import Page from 'components/common/layouts/page'
import { PageHero } from 'components/common/page-hero'
import themes from './themes.module.scss'
import { pageHOC } from 'context/pageHOC'
import { usePageContext } from 'context/page-context'
import { Tags } from 'components/common/tags'
import { getGlobalData } from 'services/global'
import { GetPage } from 'services/page'
import TrackList from 'components/domain/index/track-list'
import css from './schedule.module.scss'
import CallToAction from 'components/common/card/CallToActionCard'
import ScheduleBackground from 'assets/images/pages/schedule.svg'
import { useTranslations } from 'next-intl'
import { Link } from 'components/common/link'
import ArrowRight from 'assets/icons/arrow_right.svg'

export default pageHOC(function NewsTemplate(props: any) {
  const intl = useTranslations()
  const pageContext = usePageContext()

  return (
    <Page theme={themes['schedule']}>
      <PageHero
        path={[{ text: <span className="bold">Program</span> }, { text: 'Overview' }]}
        navigation={[
          {
            title: intl('program_overview_about'),
            to: '#about',
          },
          {
            title: intl('program_overview_values'),
            to: '#values',
          },
          {
            title: intl('program_overview_tracks'),
            to: '#tracks',
          },
        ]}
      />

      <div className={css['layout']}>
        <div className="section">
          <div className={`${css['about']} clear-bottom border-bottom margin-bottom`} id="about">
            <div className={css['left']}>
              <div>
                <h2>Programming</h2>
                <p className="h2 highlighted">
                  Devcon is geared toward Ethereum&apos;s builders, creators, and thinkers who wish to improve this
                  world and takes a holistic approach and aims to engage all attendees.
                </p>
              </div>

              <div className={css['links']}>
                <Link to="/tickets" className="bold text-uppercase">
                  Tickets
                  <ArrowRight />
                </Link>
                <Link to="/faq" className="bold text-uppercase">
                  Frequently Asked Questions
                  <ArrowRight />
                </Link>
              </div>
            </div>

            <div className={css['right']}>
              <CallToAction
                color="purple"
                title="Speaker Applications"
                tag="OPEN"
                BackgroundSvg={ScheduleBackground}
                link="/schedule"
                linkText="Apply to Speak"
                meta="Application Deadline: June 29th"
              >
                This year&apos;s Devcon will be similar to those before it - expect to see amazing talks, panels, and
                participate in workshops and sessions. Some speakers will be invited to speak, while others will apply
                via the Call for Presenter application process.
              </CallToAction>
            </div>
          </div>

          <div className={`${css['about']} clear-bottom`} id="values">
            <h2>Devcon Programming Values</h2>
          </div>
        </div>

        <TrackList />

        <div className="clear-bottom"></div>

        <div className="section">
          <Tags items={pageContext?.current?.tags} viewOnly={false} />
        </div>
      </div>
    </Page>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const page = await GetPage('/schedule', context.locale)

  return {
    props: {
      ...globalData,
      page,
    },
  }
}
