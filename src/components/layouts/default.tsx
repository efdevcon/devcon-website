import React, { ReactNode } from 'react'
import { Header } from 'src/components/header'
import { Navigation } from 'src/components/navigation'
import 'src/assets/main.css'

type LayoutProps = {
  children: ReactNode
}

export default function DefaultLayout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <Navigation />

      <div className="container">{children}</div>
    </div>
  )
}
