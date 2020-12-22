import React from 'react'
import { Link } from 'gatsby'
import { useIntl } from 'gatsby-plugin-intl'
import { LanguageToggle } from 'src/components/common/language-toggle'
import './header.module.scss'

export function Header() {
  const intl = useIntl()

  return (
    <header>
      <div>
        <h1>
          <Link to={`/${intl.locale}/`}>{intl.formatMessage({ id: 'title' })}</Link>
        </h1>
      </div>

      <LanguageToggle />
    </header>
  )
}
