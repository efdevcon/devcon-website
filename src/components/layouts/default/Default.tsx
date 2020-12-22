import React, { ReactNode } from 'react'
import { Header } from 'src/components/common/header'
import { Footer } from 'src/components/common/footer'
import { Navigation } from 'src/components/common/navigation'
import './Default.module.scss'

type LayoutProps = {
  children: ReactNode
  footerData: any
}

export default function Default({ children, footerData }: LayoutProps) {
  return (
    <div className="layout">
      <div className="content">
        <Header />
        <Navigation />
        {children}
      </div>

      <Footer data={footerData} />
    </div>
  )
}
