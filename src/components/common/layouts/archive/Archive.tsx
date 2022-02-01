import React, { ReactNode } from 'react'
import { Header } from 'components/common/layouts/header'
import { Footer } from 'components/common/layouts/footer'
import css from './archive.module.scss'
import { SEO } from 'components/domain/seo'

type LayoutProps = {
  children: ReactNode
  className?: string
}

export default function Archive(props: LayoutProps) {
  let className = 'layout'
  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      <SEO />
      <Header />

      <div className="content">{props.children}</div>

      <Footer />
    </div>
  )
}
