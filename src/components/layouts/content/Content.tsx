import React, { ReactNode } from 'react'
import { Header } from 'src/components/layouts/header'
import { Footer } from 'src/components/layouts/footer'
import { SiteNavigationContextProvider } from 'src/context/site-navigation-context-provider'
import './content.module.scss'

type LayoutProps = {
  children: ReactNode
  navigationData: any
}

export default function Content({ children, navigationData }: LayoutProps) {  
  return (
    <div className="layout">
      <SiteNavigationContextProvider data={navigationData}>
        <Header withHero={false} />

        <div className="content">{children}</div>

        <Footer />
      </SiteNavigationContextProvider>
    </div>
  )
}
