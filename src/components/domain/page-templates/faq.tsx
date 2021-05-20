import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { SEO } from 'src/components/domain/seo'
import { FAQ } from 'src/components/domain/faq'
import { PageHero } from 'src/components/common/page-hero'
import { ToFaqData } from 'src/components/domain/faq/queryMapper'
import { Category } from 'src/types/Category'
import { Search } from 'src/components/domain/faq/search'
import Content from 'src/components/common/layouts/content'
import css from './templates.module.scss'

import AskDeva from 'src/assets/images/ask-deva.png'
import PageHeroLogo from 'src/assets/images/logo-faq.svg'
import { pageHOC } from 'src/context/pageHOC'

export default pageHOC(function FaqTemplate({ data, location }: any) {
  const page = data.markdownRemark
  const faq = ToFaqData(data)
  const [searchFilter, setSearchFilter] = useState('')

  return (
    <Content>
      <SEO title={page.frontmatter.title} description={page.frontmatter.description} lang={page.fields.lang} />

      <PageHero
        title={page.frontmatter.title}
        type="about"
        logo={PageHeroLogo}
        navigation={faq.map((category: Category) => {
          return { title: category.title, to: `#${category.id}` }
        })}
      />

      <div className="section">
        <div className="content">
          <section id="contribute" className={css['section']}>
            <h3 className="spaced">{page.frontmatter.title}</h3>
            <div className={css['container']}>
              <div className={css['left-70']}>
                <div className={css['description']}>
                  <p dangerouslySetInnerHTML={{ __html: page.html }} />
                </div>

                <Search onSearch={e => setSearchFilter(e)} />
              </div>
              <div className={css['right-deva']}>
                <img src={AskDeva} alt="Ask Deva" />
              </div>
            </div>
          </section>

          <FAQ data={faq} filter={searchFilter} />
        </div>
      </div>
    </Content>
  )
})

export const query = graphql`
  query($slug: String!, $language: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        lang
      }
      frontmatter {
        title
        template
        description
      }
    }
    ...NavigationData
    ...LatestNewsItem
    ...Categories
    ...FAQs
  }
`
