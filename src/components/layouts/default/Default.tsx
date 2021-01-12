import React, { ReactNode } from 'react'
import { Header } from 'src/components/layouts/header'
import { Footer } from 'src/components/layouts/footer'
import { Hero } from 'src/components/hero'
import { SiteNavigationContextProvider } from 'src/context/site-navigation-context-provider'
import './default.module.scss'

type LayoutProps = {
  children: ReactNode
  navigationData: any
}

export default function Default({ children, navigationData }: LayoutProps) {
  return (
    <div className="layout-default">
      <SiteNavigationContextProvider data={navigationData}>
        <Header withHero={true} />
        <Hero />

        <div className="content">{children}</div>

        <Footer />
      </SiteNavigationContextProvider>
    </div>
  )
}
