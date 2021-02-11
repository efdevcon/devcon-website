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
import { TwoColumns } from 'src/components/sections/2column'
import { useIntl } from 'gatsby-plugin-intl'

export default function CityGuideTemplate({ data, location }: any) {
  const intl = useIntl()
  const page = data.markdownRemark
  const faqs = ToFaqData(data)
  const faq = faqs.filter(i => i.id === 'location');
  const todo = {
    title: data.todo.nodes[0].frontmatter.title,
    show_title: data.todo.nodes[0].frontmatter.show_title,
    left: data.todo.nodes[0].fields.frontmattermd.left.html,
    right: data.todo.nodes[0].fields.frontmattermd.right.html,
  }
  const why = {
    title: data.why.nodes[0].frontmatter.title,
    show_title: data.why.nodes[0].frontmatter.show_title,
    left: data.why.nodes[0].fields.frontmattermd.left.html,
    right: data.why.nodes[0].fields.frontmattermd.right.html,
  }
  
  return (
    <Content navigationData={data.navigationData} location={location}>
      <SEO title={page.frontmatter.title} description={page.frontmatter.description} lang={page.fields.lang} />

      <PageHero
        title={page.frontmatter.title}
        type="location"
        logo={PageHeroLogo}
        navigation={[
          {
            title: intl.formatMessage({ id: 'location_title' }),
            to: '#location',
          },
          {
            title: intl.formatMessage({ id: 'location_things_todo' }),
            to: '#things-todo',
          },
          {
            title: intl.formatMessage({ id: 'location_why_bogota' }),
            to: '#why-bogota',
          },
          {
            title: 'Frequently Asked Questions',
            to: '#FAQ',
          },
        ]}
      />

      <div className="section">
        <div className={'content ' + css['location']}>
          <section id="about" className={css['section']}>
            <h3 className="subsection-header">{intl.formatMessage({ id: 'location_title' })}</h3>
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

          <TwoColumns id="things-todo" left={todo.left} right={todo.right} />

          <TwoColumns id="why-bogota" title={why.title} left={why.left} right={why.right} />

          <section id="FAQ" className={css['section']}>
            <FAQ data={faq} customCategoryTitle="Frequently Asked Questions" />
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
    todo: allMarkdownRemark(
      filter: {
        fields: { lang: { eq: $language }, collection: { eq: "sections" }, id: { eq: "things-to-do" } }
        frontmatter: { title: { ne: "" } }
      }
    ) {
      nodes {
        frontmatter {
          title
          show_title
        }
        fields {
          id
          frontmattermd {
            left {
              html
            }
            right {
              html
            }
          }
        }
      }
    }
    why: allMarkdownRemark(
      filter: {
        fields: { lang: { eq: $language }, collection: { eq: "sections" }, id: { eq: "why-devcon-in-bogota" } }
        frontmatter: { title: { ne: "" } }
      }
    ) {
      nodes {
        frontmatter {
          title
          show_title
        }
        fields {
          id
          frontmattermd {
            left {
              html
            }
            right {
              html
            }
          }
        }
      }
    }
  }
`
