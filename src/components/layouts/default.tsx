import React, { ReactNode } from "react"
import { Header } from "src/components/header"
import { Footer } from "src/components/footer"
import { Navigation } from "../navigation"
// import DesignSystemTest from "../design-system"
// @ts-ignore
import css from "./default.module.scss"

console.log(css, "css")

type LayoutProps = {
  children: ReactNode
}

export default function DefaultLayout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <div className="content">
        <Header />
        <Navigation />
        {children}
      </div>

      {/* <DesignSystemTest /> */}
      <Footer />
    </div>
  )
}
