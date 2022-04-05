import React from 'react'
import { PageHero } from 'components/common/page-hero'
import { FAQ } from 'components/domain/faq'
import Content from 'components/common/layouts/content'
import css from '../templates.module.scss'
import themes from '../themes.module.scss'
import { Carousel } from 'components/common/carousel'
import { Snapshot } from 'components/common/snapshot'
import { TwoColumns } from 'components/common/sections/2column'
import { pageHOC } from 'context/pageHOC'
import { PageContentSection } from './page-content-section'
import { usePageContext } from 'context/page-context'
import { useTranslations } from 'next-intl'

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

      <PageContentSection>
        <TwoColumns id="about" title={intl('location_title')} left={pageContext?.current?.body} right={<Snapshot />} />

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
      </PageContentSection>
    </Content>
  )
})
