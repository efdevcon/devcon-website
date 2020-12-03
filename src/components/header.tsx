import React from "react"
import { useIntl } from "gatsby-plugin-intl"
import { Link } from "gatsby"
import { LanguageToggle } from "./languageToggle"

export function Header() {
  const intl = useIntl()

  return (
    <header>
      <div>
        <h1>
          <Link to={`/${intl.locale}`}>{intl.formatMessage({ id: "title" })}</Link>
        </h1>
        <small>{intl.formatMessage({ id: "description" })}</small>
      </div>
      
      <LanguageToggle />
    </header>
  )
}
