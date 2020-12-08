import React from 'react'
import { useIntl } from 'gatsby-plugin-intl'
import { Link } from 'gatsby'
import { LanguageToggle } from 'src/components/common/language-toggle'

export function Header() {
  const intl = useIntl()

  return (
    <header>
      <div>
        <h1>
          <Link to={`/${intl.locale}`}>{intl.formatMessage({ id: 'title' })}</Link>
        </h1>
      </div>

      <LanguageToggle />
    </header>
  )
}
