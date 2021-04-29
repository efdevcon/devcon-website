import React, { ReactNode } from 'react'
import { Header } from 'src/components/common/layouts/header'
import { Footer } from 'src/components/common/layouts/footer'
import { Hero } from 'src/components/domain/hero'
import { PageContextProvider } from 'src/context/page-context-provider'
import './default.module.scss'

type LayoutProps = {
  children: ReactNode
  navigationData: any
  location: any
}

export default function Default({ children, navigationData, location }: LayoutProps) {
  return (
    <div className="layout-default">
      <PageContextProvider navigationData={navigationData} location={location}>
        <Header withHero={true} />
        <Hero />

        <div className="content">{children}</div>

        <Footer />
      </PageContextProvider>
    </div>
  )
}
