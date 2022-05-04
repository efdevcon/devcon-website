import React from 'react'
import { PageHero } from 'components/common/page-hero'
import { FAQ } from 'components/domain/faq'
import Content from 'components/common/layouts/content'
import css from './templates.module.scss'
import themes from './themes.module.scss'
import { Carousel } from 'components/common/carousel'
import { Snapshot } from 'components/common/snapshot'
import { TwoColumns } from 'components/common/sections/2column'
import { pageHOC } from 'context/pageHOC'
import { PageContentSection } from 'components/common/layouts/content/PageContentSection'
import { usePageContext } from 'context/page-context'
import { useTranslations } from 'next-intl'
import { GetCategories, GetDIPs, GetFAQ, GetPage, GetPages, GetContentSection } from 'services/page'
import { getGlobalData } from 'services/global'
import markdownUtils from 'utils/markdown'
import { Tags } from 'components/common/tags'

export default pageHOC(function CityGuideTemplate(props: any) {
  const intl = useTranslations()
  const pageContext = usePageContext()
  const faqs = props.faq.filter((faq: any) => faq.category.id === 'location')

  return (
    <Content theme={themes['purple']}>
      <PageHero
        path={[{ text: 'Bogota' }, { text: 'City Guide' }]}
        navigation={[
          {
            title: intl('location_title'),
            to: '#location',
          },
          {
            title: intl('location_things_todo'),
            to: '#things-todo',
          },
          {
            title: intl('location_why_bogota'),
            to: '#why-bogota',
          },
          {
            title: 'Frequently Asked Questions',
            to: '#FAQ',
          },
        ]}
      />

      <div className="section">
        <div className="two-columns">
          <div className="left">
            <h2 className="spaced">{intl('location_title')}</h2>
            <div dangerouslySetInnerHTML={{ __html: props.sections.todo.left }} />
          </div>
          <div className="right">
            <Snapshot />
          </div>
        </div>

        {/* <div className={css['column']}>
          <div className={css['left']}></div>
          <div className={css['right']}></div>
        </div> */}

        {/* <TwoColumns id="about" title={intl('location_title')} left={pageContext?.current?.body} right={<Snapshot />} /> */}

        <section id="carousel" className={css['section']}>
          <Carousel />
        </section>

        <TwoColumns id="things-todo" left={props.sections.todo.left} right={props.sections.todo.right} />

        <TwoColumns
          id="why-bogota"
          title={props.sections.why.title}
          left={props.sections.why.left}
          right={props.sections.why.right}
        />

        <section id="FAQ" className={css['section']}>
          <FAQ
            data={[{ id: 'something', title: 'Frequently Asked Questions', questions: faqs }]}
            customCategoryTitle="Frequently Asked Questions"
          />
        </section>

        <Tags items={pageContext?.current?.tags} viewOnly={false} />
      </div>
    </Content>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const page = await GetPage('/bogota', context.locale)
  const todoData = await GetContentSection('things-to-do', context.locale)
  const whyData = await GetContentSection('why-devcon-in-bogota', context.locale)

  const todo = {
    left: await markdownUtils.toHtml(todoData.data.left),
    right: await markdownUtils.toHtml(todoData.data.right),
  }

  const why = {
    title: whyData.data.title,
    left: await markdownUtils.toHtml(whyData.data.left),
    right: await markdownUtils.toHtml(whyData.data.right),
  }

  return {
    props: {
      ...globalData,
      page,
      faq: await GetFAQ(context.locale),
      sections: {
        todo,
        why,
      },
    },
  }
}
