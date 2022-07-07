import React from 'react'
import Page from 'components/common/layouts/page'
import { PageHero } from 'components/common/page-hero'
import themes from '../themes.module.scss'
import { pageHOC } from 'context/pageHOC'
import { getGlobalData } from 'services/global'
import { GetPage } from 'services/page'
import { Tags } from 'components/common/tags'
import { usePageContext } from 'context/page-context'
import Schedule from './schedule/schedule'
import getNotionDatabase from './schedule/getNotionDatabase'
import { useTranslations } from 'next-intl'
import { Snapshot } from 'components/common/snapshot'
import { Link } from 'components/common/link'
import ArrowRight from 'assets/icons/arrow_right.svg'

export default pageHOC(function ContinuousDevcon(props: any) {
  const pageContext = usePageContext()
  const intl = useTranslations()

  return (
    <Page theme={themes['bogota']}>
      <PageHero
        path={[{ text: <span className="bold">Bogotá</span> }, { text: props.page.header }]}
        navigation={[
          {
            title: intl('devcon_week_overview'),
            to: '#overview',
          },
          {
            title: intl('devcon_week_featured_events'),
            to: '#things-to-do',
          },
          {
            title: intl('devcon_week_overview'),
            to: '#why-bogota',
          },
        ]}
      />

      <div className="section">
        <div className="two-columns clear-bottom border-bottom margin-bottom">
          <div className="left">
            <h2 className="spaced">{props.page.title}</h2>

            <div className="markdown" dangerouslySetInnerHTML={{ __html: props.page.body }} />

            <div className="links">
              <Link to="/tickets" className="text-uppercase hover-underline font-lg bold">
                {intl('tickets_title')}
                <ArrowRight />
              </Link>
              <Link to="/faq" className="text-uppercase hover-underline font-lg bold">
                {intl('faq_title')}
                <ArrowRight />
              </Link>
            </div>
          </div>

          <div className="right">
            <Snapshot
              items={[
                {
                  Icon: () => <></>,
                  title: '🇦🇷 eTHLATAM - BUENOS AIRES',
                  right: 'some date',
                },
                {
                  Icon: () => <></>,
                  title: '🇦🇷 eTHLATAM - BUENOS AIRES',
                  right: 'some date',
                },
                {
                  Icon: () => <></>,
                  title: '🇦🇷 eTHLATAM - BUENOS AIRES',
                  right: 'some date',
                },
                {
                  Icon: () => <></>,
                  title: '🇦🇷 eTHLATAM - BUENOS AIRES',
                  right: 'some date',
                },
                {
                  Icon: () => <></>,
                  title: '🇦🇷 eTHLATAM - BUENOS AIRES',
                  right: 'some date',
                },
              ]}
            />
          </div>
        </div>
      </div>

      <Schedule events={props.scheduleData} />

      {/* <Tags items={pageContext?.current?.tags} viewOnly /> */}
    </Page>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const page = await GetPage('/devcon-week', context.locale)

  return {
    props: {
      ...globalData,
      scheduleData: await getNotionDatabase(),
      page,
    },
  }
}
