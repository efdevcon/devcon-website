import React from 'react'
import Page from 'components/common/layouts/page'
import { PageHero } from 'components/common/page-hero'
import themes from './themes.module.scss'
import { pageHOC } from 'context/pageHOC'
import { getGlobalData } from 'services/global'
import { GetPage, GetFAQ, GetContentSections } from 'services/page'
import Schedule from 'components/domain/devcon-week/schedule'
import getNotionDatabase from 'components/domain/devcon-week/getNotionDatabase'
import { useTranslations } from 'next-intl'
import { Snapshot } from 'components/common/snapshot'
import { Link } from 'components/common/link'
import ArrowRight from 'assets/icons/arrow_right.svg'
import { FAQ } from 'components/domain/faq'
import css from './devcon-week.module.scss'
import { isAfterDate } from './tickets'

export default pageHOC(function DevconWeek(props: any) {
  const intl = useTranslations()

  return (
    <Page theme={themes['program']}>
      <PageHero
        path={[{ text: <span className="bold">{intl('program_title')}</span> }, { text: props.page.header }]}
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
          {
            title: 'FAQ',
            to: '#faq',
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
              {/* <Link to="/tickets" className="text-uppercase hover-underline font-lg bold">
                {intl('devcon_week_bogota_blockchain_week')}
                <ArrowRight />
              </Link> */}
              <Link to="/continuous-devcon" className="text-uppercase hover-underline font-lg bold">
                {intl('cd_title')}
                <ArrowRight />
              </Link>

              <Link to="#faq" className="text-uppercase hover-underline font-lg bold">
                {intl('cd_production_contacts')}
                <ArrowRight />
              </Link>
            </div>
          </div>

          <div className={`right ${css['space-between']} ${css['snapshot-container']}`}>
            <h2 className="spaced">{intl('devcon_week_pre_devcon_events')}</h2>

            <Snapshot
              items={[
                {
                  Icon: () => <></>,
                  id: '1',
                  title: isAfterDate('2022-08-14') ? <s>🇦🇷 ETHLatam - Buenos Aires</s> : '🇦🇷 ETHLatam - Buenos Aires',
                  right: 'AUG 11-14',
                },
                {
                  Icon: () => <></>,
                  title: isAfterDate('2022-08-21') ? <s>🇲🇽 ETHMexicoCity</s> : '🇲🇽 ETHMexicoCity',
                  right: 'AUG 19-21',
                },
                {
                  Icon: () => <></>,
                  title: isAfterDate('2022-09-03') ? (
                    <s>🇵🇪 ETHLima day</s>
                  ) : (
                    <Link className="hover-underline" to="https://twitter.com/ethereumlima" indicateExternal>
                      🇵🇪 ETHLima day
                    </Link>
                  ),
                  right: 'SEP 3',
                },
                {
                  Icon: () => <></>,
                  title: isAfterDate('2022-09-11') ? (
                    <s>🇧🇷 EthereumSãoPaulo</s>
                  ) : (
                    <Link className="hover-underline" to="https://twitter.com/ethereumbrasil" indicateExternal>
                      🇧🇷 EthereumSãoPaulo
                    </Link>
                  ),
                  right: 'SEP 9-11',
                },
                {
                  Icon: () => <></>,
                  title: isAfterDate('2022-09-24') ? (
                    <s>🇨🇱 ETHSantiago</s>
                  ) : (
                    <Link className="hover-underline" to="https://twitter.com/ethsantiago" indicateExternal>
                      🇨🇱 ETHSantiago
                    </Link>
                  ),
                  right: 'SEP 23-24',
                },
                {
                  Icon: () => <></>,
                  title: isAfterDate('2022-10-01') ? (
                    <s>🇪🇨 ETHQuito Day</s>
                  ) : (
                    <Link className="hover-underline" to="https://twitter.com/ethereum_ec" indicateExternal>
                      🇪🇨 ETHQuito Day
                    </Link>
                  ),
                  right: 'SEP 30',
                },
                {
                  Icon: () => <></>,
                  title: isAfterDate('2022-10-09') ? (
                    <s>🇨🇴 ETHBogotá</s>
                  ) : (
                    <Link className="hover-underline" to="https://twitter.com/ETHGlobal" indicateExternal>
                      🇨🇴 ETHBogotá
                    </Link>
                  ),
                  right: 'OCT 7-9',
                },
                {
                  Icon: () => <></>,
                  title: isAfterDate('2022-10-10') ? (
                    <s>🇨🇴 ETHLatam @ Bogotá</s>
                  ) : (
                    <Link className="hover-underline" to="https://twitter.com/ethlatam" indicateExternal>
                      🇨🇴 ETHLatam @ Bogotá
                    </Link>
                  ),
                  right: 'OCT 10',
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
          </div>
          <div className={`right ${css['space-between']}`}>
            <div
              className="markdown"
              dangerouslySetInnerHTML={{ __html: props.sections['post-devcon-events'].data.right }}
            ></div>

            {/* <Link to="https://google.com">
              <Button className="red margin-top">{intl('devcon_week_learn_more')}</Button>
            </Link> */}
          </div>
        </div>
      </div>

      <div id="faq" className="section">
        <FAQ
          data={[{ id: 'something', title: 'Frequently Asked Questions', questions: props.faq }]}
          customCategoryTitle="FAQ"
          noSearch
        />
      </div>

      {/* <Tags items={pageContext?.current?.tags} viewOnly /> */}
    </Page>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const page = await GetPage('/devcon-week', context.locale)
  const faq = await GetFAQ(context.locale)
  const sections = await GetContentSections(['post-devcon-events'], context.locale)

  return {
    props: {
      ...globalData,
      sections,
      faq: faq.filter((faq: any) => faq.category.id === 'devcon-week'),
      scheduleData: await getNotionDatabase(context.locale || 'en'),
      page,
    },
  }
}