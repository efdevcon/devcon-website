import React from 'react'
import { graphql } from 'gatsby'
import { SEO } from 'src/components/common/seo'
import { PageHero } from 'src/components/common/page-hero'
import { FAQ } from 'src/components/faq'
import { ToFaqData } from 'src/components/faq/queryMapper'
import Content from 'src/components/layouts/content'
import css from './templates.module.scss'

import PageHeroLogo from 'src/assets/images/logo-city-guide.svg'
import { Carousel } from 'src/components/common/carousel'
import { Snapshot } from 'src/components/snapshot'

export default function CityGuideTemplate({ data, location }: any) {
  const page = data.markdownRemark
  const faq = ToFaqData(data)

  return (
    <Content navigationData={data.navigationData} location={location}>
      <SEO title={page.frontmatter.title} description={page.frontmatter.description} lang={page.fields.lang} />

      <PageHero
        title={page.frontmatter.title}
        type="location"
        logo={PageHeroLogo}
        navigation={[]}
      />

      <div className="section">
        <div className={"content " + css['location']}>

          <section id="contribute" className={css['section']}>
            <h3 className="subsection-header">{page.frontmatter.title}</h3>
            <div className={css['container']}>
              <div className={css['left-70']}>
                <div className={css['description']}>
                  <p dangerouslySetInnerHTML={{ __html: page.html }} />
                </div>
              </div>
              <div className={css['right-deva']}>
                <Snapshot />
              </div>
            </div>
          </section>

          <section id="carousel" className={css['section']}>
            <Carousel />
          </section>

          <section id="FAQ" className={css['section']}>
            <FAQ data={faq.filter(i => i.id === 'location')} customCategoryTitle="Frequently Asked Questions" />
          </section>
        </div>
      </div>
    </Content>
  )
}

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
    ...Categories
    ...FAQs
  }
`
