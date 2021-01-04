import React, { ReactNode } from 'react'
import { Header } from 'src/components/layouts/header'
import { Footer } from 'src/components/layouts/footer'
import './content.module.scss'

type LayoutProps = {
  children: ReactNode
  footerData: any
}

export default function Content({ children, footerData }: LayoutProps) {
  return (
    <div className="layout">
      <Header withHero={false} />

      <div className="content">{children}</div>

      <Footer data={footerData} />
    </div>
  )
}
