import React, { useState } from 'react'
import { FAQ } from 'components/domain/faq'
import { PageHero } from 'components/common/page-hero'
import { Category } from 'types/Category'
import { Search } from 'components/domain/faq/search'
import Page from 'components/common/layouts/page'
import css from './templates.module.scss'
import themes from './themes.module.scss'
import AskDeva from 'assets/images/ask-deva.png'
import { pageHOC } from 'context/pageHOC'
import { usePageContext } from 'context/page-context'
import Image from 'next/image'
import { getGlobalData } from 'services/global'
import { GetPage, GetCategories } from 'services/page'
import { Tags } from 'components/common/tags'
import { useTranslations } from 'next-intl'

export default pageHOC(function FaqTemplate(props: any) {
  const pageContext = usePageContext()
  const intl = useTranslations()

  return (
    <Page theme={themes['about']}>
      <PageHero
        path={[{ text: <span className="bold">{intl('about_title')}</span> }, { text: 'FAQ' }]}
        navigation={props.faq.map((category: Category) => {
          return { title: category.title, to: `#${category.id}` }
        })}
      />

      <div className="section">
        {/* <div id="contribute" className={css['section']}>
          <h2 className="spaced">{pageContext?.current?.title}</h2>
          <div className={css['container']}>
            <div className={css['left-70']}>
              <div className={css['description']}>
                <p dangerouslySetInnerHTML={{ __html: pageContext?.current?.body ?? '' }} />
              </div>

              <Search onSearch={e => setSearchFilter(e)} />
            </div>
            <div className={css['right-deva']}>
              <Image src={AskDeva} alt="Ask Deva" />
            </div>
          </div>
        </div> */}

        <FAQ data={props.faq} />
        <Tags items={pageContext?.current?.tags} viewOnly />
      </div>
    </Page>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const page = await GetPage('/faq', context.locale)

  return {
    props: {
      ...globalData,
      page,
      faq: await GetCategories(context.locale),
    },
  }
}
