import React, { useState } from 'react'
import { FAQ } from 'components/domain/faq'
import { PageHero } from 'components/common/page-hero'
import { Category } from 'types/Category'
import { Search } from 'components/domain/faq/search'
import Content from 'components/common/layouts/content'
import css from '../templates.module.scss'
import themes from '../themes.module.scss'
import AskDeva from 'assets/images/ask-deva.png'
import { pageHOC } from 'context/pageHOC'
import { PageContentSection } from './page-content-section'
import { usePageContext } from 'context/page-context'
import Image from 'next/image'

export default pageHOC(function FaqTemplate(props: any) {
  const pageContext = usePageContext()
  const [searchFilter, setSearchFilter] = useState('')

  return (
    <Content theme={themes['green']}>
      <PageHero
        navigation={props.faq.map((category: Category) => {
          return { title: category.title, to: `#${category.id}` }
        })}
      />

      <PageContentSection>
        <section id="contribute" className={css['section']}>
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
        </section>

        <FAQ data={props.faq} filter={searchFilter} />
      </PageContentSection>
    </Content>
  )
})
