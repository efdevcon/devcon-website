import React from 'react'
import Page from 'components/common/layouts/page'
import { PageHero } from 'components/common/page-hero'
import themes from './themes.module.scss'
import { pageHOC } from 'context/pageHOC'
import { getGlobalData } from 'services/global'
import { GetDevconEditions, GetPage } from 'services/page'
import { Tags } from 'components/common/tags'
import { usePageContext } from 'context/page-context'
import ArrowRight from 'assets/icons/arrow_right.svg'
import css from './past-events.module.scss'
import { Link } from 'components/common/link'
import Image from 'next/image'
import EventLocations from 'assets/images/event-locations.png'
import { DevconEdition } from 'types/DevconEdition'
import { Button } from 'components/common/button'

import Berlin from 'assets/images/editions/Berlin.png'
import London from 'assets/images/editions/London.png'
import Shanghai from 'assets/images/editions/Shanghai.png'
import Cancun from 'assets/images/editions/Cancun.png'
import Prague from 'assets/images/editions/Prague.png'
import Osaka from 'assets/images/editions/Osaka.png'

function getEditionImage(edition: number) {
  if (edition === 0) return Berlin
  if (edition === 1) return London
  if (edition === 2) return Shanghai
  if (edition === 3) return Cancun
  if (edition === 4) return Prague
  if (edition === 5) return Osaka

  return ''
}

export default pageHOC(function PastEvents(props: any) {
  const pageContext = usePageContext()

  return (
    <Page theme={themes['about']}>
      <PageHero
        path={[{ text: <span className="bold">About</span> }, { text: 'Past Events' }]}
        navigation={props.editions.map((edition: any) => {
          return {
            title: edition.title,
            to: `#${edition.id}`,
          }
        })}

        // navigation={[
        //   {
        //     title: intl('program_overview_about'),
        //     to: '#about',
        //   },
        //   {
        //     title: intl('program_overview_values'),
        //     to: '#values',
        //   },
        //   {
        //     title: intl('program_overview_tracks'),
        //     to: '#tracks',
        //   },
        //   {
        //     title: intl('program_overview_faq'),
        //     to: '#faq',
        //   },
        // ]}
      />

      <div className="section">
        <div className={`two-columns ${css['about']} clear-bottom border-bottom margin-bottom`}>
          <div className={`left ${css['left']}`}>
            <div className="section-markdown">
              <h2>Devcon Editions</h2>
              <div className="markdown" dangerouslySetInnerHTML={{ __html: props.page.body }} />
            </div>

            <div className={css['links']}>
              <Link to="/overview" className="text-uppercase hover-underline font-lg bold">
                Programming
                <ArrowRight />
              </Link>
              <Link to="https://archive.devcon.org/archive/" className="text-uppercase hover-underline font-lg bold">
                Archive
                <ArrowRight />
              </Link>
            </div>
          </div>
          <div className={`right ${css['right']}`}>
            <h2 className="spaced">Locations</h2>
            <Image src={EventLocations} alt="Devcon events on world map" />
          </div>
        </div>

        <div className="border-bottom clear-bottom">
          <h2>Past Devcons</h2>
        </div>

        {props.editions.map((edition: DevconEdition, index: number) => {
          const isLast = index === props.editions.length - 1

          let className = 'clear-bottom clear-top'

          if (!isLast) className += ` border-bottom`

          return (
            <div key={edition.id} id={edition.id} className={className}>
              <div className={css['edition']}>
                <div className={css['left']}>
                  {getEditionImage(edition.number) && (
                    <Image src={getEditionImage(edition.number)} alt={`${edition.title} event image`} />
                  )}
                </div>
                <div className={css['right']}>
                  <h2 className="spaced">{edition.title}</h2>
                  <div>{edition.description}</div>
                  <div className={css['links']}>
                    {edition.links.map((link: any) => {
                      return (
                        <Link key={link.url} to={link.url}>
                          <Button className="green lg" onClick={(e: React.SyntheticEvent) => e.stopPropagation()}>
                            {link.title}
                          </Button>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        <div className="clear-bottom" />

        <Tags items={pageContext?.current?.tags} viewOnly />
      </div>
    </Page>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const page = await GetPage('/past-events', context.locale)
  const editions = GetDevconEditions(context.locale)
    .sort((a, b) => b.number - a.number)
    .filter(i => i.startDate && i.startDate < new Date().getTime())

  return {
    props: {
      ...globalData,
      page,
      editions,
    },
  }
}
