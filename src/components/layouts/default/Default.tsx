import React, { FunctionComponent, ReactNode } from 'react'
import { Header } from 'src/components/layouts/header'
import { Footer } from 'src/components/layouts/footer'
import './default.module.scss'

type LayoutProps = {
  children: ReactNode
  HeroComponent?: FunctionComponent
  footerData: any
}

export default function Default({ children, footerData, HeroComponent }: LayoutProps) {
  return (
    <div className="layout-default">
      <Header className="header" withHero={!!HeroComponent} />

      {/* 
        The hero component is pretty big, so passing it in as a prop rather than explicitly in this component means we only have to load it on the index page 
        This assume gatsby does code splitting - worth confirming
      */}
      {HeroComponent && <HeroComponent />}

      <div className="content">{children}</div>

      <Footer className="footer" data={footerData} />
    </div>
  )
}
