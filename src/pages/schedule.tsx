import React from 'react'
import Page from 'components/common/layouts/page'
import { PageHero } from 'components/common/page-hero'
import themes from './themes.module.scss'
import { pageHOC } from 'context/pageHOC'
import { usePageContext } from 'context/page-context'
import { Tags } from 'components/common/tags'
import { getGlobalData } from 'services/global'
import { FAQ } from 'components/domain/faq'
import { GetPage, GetFAQ } from 'services/page'
import TrackList from 'components/domain/index/track-list'
import css from './schedule.module.scss'
import CallToAction from 'components/common/card/CallToActionCard'
import ScheduleBackground from 'assets/images/pages/schedule.svg'
import ArrowRight from 'assets/icons/arrow_right.svg'
import { useTranslations } from 'next-intl'
import { Link } from 'components/common/link'
import List from 'components/common/list'
import { Button } from 'components/common/button'

export default pageHOC(function Schedule(props: any) {
  const intl = useTranslations()
  const pageContext = usePageContext()

  return (
    <Page theme={themes['program']}>
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
          {
            title: intl('program_overview_faq'),
            to: '#faq',
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
                  world. Programming at Devcon takes a holistic approach and aims to engage all attendees through talks,
                  panels, workshops, lightning talks, and freeform learning sessions.
                </p>
              </div>

              <div className={css['links']}>
                <Link to="/tickets" className="text-uppercase hover-underline font-lg bold">
                  Tickets
                  <ArrowRight />
                </Link>
                <Link to="/faq" className="text-uppercase hover-underline font-lg bold">
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
                link="/applications"
                linkText="Applications"
                meta="Application Deadline: June 29th"
              >
                This year&apos;s Devcon will be similar to those before it - expect to see amazing talks, panels, and
                participate in workshops and sessions. Some speakers will be invited to speak, while others will apply
                via the Call for Presenter application process.
              </CallToAction>
            </div>
          </div>

          <div className={`${css['values']} clear-bottom`} id="values">
            <h2 className="clear-bottom">Devcon Programming Values</h2>

            <List
              items={[
                {
                  id: 'collab',
                  title: 'Collaboration',
                  body: 'Devcon is a place to foster collaboration via technical discussions, debates, knowledge sharing, and innovation.',
                },
                {
                  id: 'teaching',
                  title: 'Teaching, communicating and generating new ideas',
                  body: 'Devcon is an opportunity to learn (and teach!) by attending talks, workshops, panels, and lightning talks.',
                },
                {
                  id: 'updating-community',
                  title:
                    "Updating the community on the Ethereum Foundation's key messages, updates, and calls to action",
                  body: 'Devcon is an opportunity to share the Ethereum Foundations vision and values with the world.',
                },
                {
                  id: 'bridging',
                  title: 'Building bridges with other communities',
                  body: 'There are many communities adjacent to Ethereum that are value-aligned - Devcon is a chance to come together.',
                },
                {
                  id: 'community-heard',
                  title: 'Ensuring our community is heard',
                  body: 'Devcon is a conference for the Ethereum community, and is an opportunity for the community to share important updates.',
                },
              ]}
            />
          </div>
        </div>

        <TrackList />
        <div className="clear-bottom"></div>

        <div id="faq" className="section">
          <FAQ
            data={[{ id: 'something', title: 'Frequently Asked Questions', questions: props.faq }]}
            customCategoryTitle="FAQ"
            noSearch
          />
        </div>

        <div className="section">
          <div className={`${css['meta']} border-top clear-top clear-bottom`}>
            <div className={css['left']}>
              <h2>Eco-system Supporters</h2>
              <p className="clear-bottom clear-top">
                This year, aligned teams will have the opportunity to contribute toward Ethereum-related public goods in
                a Devcon-specific effort to grow the Ethereum ecosystem, and further technologies that help us move
                forward together. In lieu of a traditional sponsorship program, team-based ticket allocations will be
                distributed to participating groups as a thank you to those who give back to the Ethereum community.
              </p>
              <Button className="purple lg">Support Now</Button>
            </div>
            <div className={css['right']}>
              <h2>Volunteers</h2>
              <p className="clear-bottom clear-top">
                Devcon could not happen without a group of dedicated, passionate volunteers helping run the show! Join
                the volunteer team alongside 100+ other fun, dedicated, passionate members of the community to help put
                on the best Devcon yet! Fill out the form to apply.
              </p>
              <Button className="purple lg">Volunteer</Button>
            </div>
          </div>
        </div>

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
  const faq = await GetFAQ(context.locale)

  return {
    props: {
      ...globalData,
      faq: faq.filter((faq: any) => faq.category.id === 'programming'),
      page,
    },
  }
}
