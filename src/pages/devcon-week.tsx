import React from 'react'
import Page from 'components/common/layouts/page'
import { PageHero } from 'components/common/page-hero'
import themes from './themes.module.scss'
import { pageHOC } from 'context/pageHOC'
import { getGlobalData } from 'services/global'
import { GetPage, GetContentSections } from 'services/page'
import Schedule from 'components/domain/devcon-week/schedule'
import getNotionDatabase from 'components/domain/devcon-week/getNotionDatabase'
import { useTranslations } from 'next-intl'
import { Snapshot } from 'components/common/snapshot'
import { Link } from 'components/common/link'
import ArrowRight from 'assets/icons/arrow_right.svg'
import { Button } from 'components/common/button'
import css from './devcon-week.module.scss'

export default pageHOC(function DevconWeek(props: any) {
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
            to: '#schedule',
          },
          {
            title: props.sections['post-devcon-events'].title,
            to: '#post-devcon',
          },
        ]}
      />

      <div className="section">
        <div className="two-columns clear-bottom border-bottom margin-bottom">
          <div className={`left ${css['space-between']}`}>
            <div>
              <h2 className="spaced" id="overview">
                {props.page.title}
              </h2>

              <div className="markdown" dangerouslySetInnerHTML={{ __html: props.page.body }} />
            </div>

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

          <div className={`right ${css['space-between']}`}>
            <Snapshot
              items={[
                {
                  Icon: () => <></>,
                  title: '🇦🇷 eTHLATAM - BUENOS AIRES',
                  right: 'AUG 11-14',
                },
                {
                  Icon: () => <></>,
                  title: '🇲🇽 eTHMexicocity',
                  right: 'AUG 19-21',
                },
                {
                  Icon: () => <></>,
                  title: '🇵🇪 eTHlima day',
                  right: 'SEP 3',
                },
                {
                  Icon: () => <></>,
                  title: '🇨🇱 eTHsantiago',
                  right: 'SEP 8-10',
                },
                {
                  Icon: () => <></>,
                  title: '🇧🇷 EthereumSãoPaulo ',
                  right: 'SEP 27-29',
                },
              ]}
            />

            <div className="links">
              <Link to="#post-devcon" className="text-uppercase hover-underline font-lg bold">
                {props.sections['post-devcon-events'].title}
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Schedule events={props.scheduleData} />

      <div className="section padding-top margin-bottom">
        <h2 className="margin-bottom border-top clear-top" id="post-devcon">
          {props.sections['post-devcon-events'].title}
        </h2>
        <div className="two-columns">
          <div className={`left ${css['space-between']}`}>
            <div
              className="markdown"
              dangerouslySetInnerHTML={{ __html: props.sections['post-devcon-events'].data.left }}
            ></div>
            <Link to="https://google.com">
              <Button className="red margin-top">{intl('devcon_week_learn_more')}</Button>
            </Link>
          </div>
          <div className={`right ${css['space-between']}`}>
            <div
              className="markdown"
              dangerouslySetInnerHTML={{ __html: props.sections['post-devcon-events'].data.right }}
            ></div>

            <Link to="https://google.com">
              <Button className="red margin-top">{intl('devcon_week_learn_more')}</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* <Tags items={pageContext?.current?.tags} viewOnly /> */}
    </Page>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const page = await GetPage('/devcon-week', context.locale)
  const sections = await GetContentSections(['post-devcon-events'], context.locale)

  return {
    props: {
      ...globalData,
      sections,
      scheduleData: await getNotionDatabase(context.locale || 'en'),
      page,
    },
  }
}
