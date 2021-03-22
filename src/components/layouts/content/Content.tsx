import React, { ReactNode } from 'react'
import { Header } from 'src/components/layouts/header'
import { Footer } from 'src/components/layouts/footer'
import { PageContextProvider } from 'src/context/page-context-provider'
import './content.module.scss'

type LayoutProps = {
  children: ReactNode
  navigationData: any
  location: any
}

export default function Content({ children, navigationData, location }: LayoutProps) {
  return (
    <div className="layout">
      <PageContextProvider navigationData={navigationData} location={location}>
        <Header withHero={false} />

        <div className="content">{children}</div>

        <Footer />
      </PageContextProvider>
    </div>
  )
}
