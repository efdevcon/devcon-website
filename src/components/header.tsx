import React from "react"
import { useIntl } from "gatsby-plugin-intl"
import { Link } from "gatsby"

export function Header() {
  const intl = useIntl()

  return (
    <header>
      <h1>{intl.formatMessage({ id: "title" })}</h1>
      <div>
        <Link to="/en/">EN</Link> | <Link to="/es/">ES</Link>
      </div>
      <span>{intl.formatMessage({ id: "description" })}</span>
    </header>
  )
}
