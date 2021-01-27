import React from 'react'
import { graphql } from 'gatsby'
import { SEO } from 'src/components/common/seo'
import { FAQ } from 'src/components/faq'
import { PageHero } from 'src/components/common/page-hero'
import { ToFaqData } from 'src/components/faq/queryMapper'
import { Category } from 'src/types/Category'
import Content from 'src/components/layouts/content'

import IconFAQ from 'src/assets/images/logo-faq.svg'

export default function FaqTemplate({ data, location }: any) {
  const page = data.markdownRemark
  const faq = ToFaqData(data)

  return (
    <Content navigationData={data.navigationData} location={location}>
      <SEO title={page.frontmatter.title} description={page.frontmatter.description} lang={page.fields.lang} />

      <PageHero
        title={page.frontmatter.title}
        type="faq"
        logo={IconFAQ}
        navigation={faq.map((category: Category) => {
          return { title: category.title, to: `#${category.id}` }
        })}
      />

      <div className="section">
        <div className="content">
          <h3 className="subsection-header">{page.frontmatter.title}</h3>
          <p dangerouslySetInnerHTML={{ __html: page.html }} />

          <FAQ data={faq} />
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
