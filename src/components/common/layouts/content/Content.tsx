import React, { ReactNode } from 'react'
import { Header } from 'src/components/common/layouts/header'
import { Footer } from 'src/components/common/layouts/footer'
import { PageContextProvider } from 'src/context/page-context-provider'
import './content.module.scss'
import { NewsItem } from 'src/types/NewsItem'

type LayoutProps = {
  children: ReactNode
  theme?: string
  style?: {
    [key: string]: any
  }
}

export default function Content({ children, theme, style }: LayoutProps) {
  let className = 'layout'

  if (theme) className += ` ${theme}`

  return (
    <div className={className} style={style}>
      <Header withHero={false} />

      <div className="content">{children}</div>

      <Footer />
    </div>
  )
}
