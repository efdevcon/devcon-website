import React, { ReactNode } from 'react'
import { Header } from 'components/common/layouts/header'
import { Footer } from 'components/common/layouts/footer'
import { Hero } from 'components/domain/hero'
import css from './default.module.scss'

type LayoutProps = {
  children: ReactNode
  // navigationData: any
  // latestNewsItem: NewsItem
  // location: any
}

export default function Default({ children }: LayoutProps) {
  return (
    <div className={css['layout-default']}>
      {/* <PageContextProvider navigationData={navigationData} latestNewsItem={latestNewsItem} location={location}> */}
      <Header withStrip={true} withHero={true} />
      <Hero />

      <div className="content">{children}</div>

      <Footer />
      {/* </PageContextProvider> */}
    </div>
  )
}
