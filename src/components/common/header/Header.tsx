import React from 'react'
import { Link } from 'gatsby'
import { useIntl } from 'gatsby-plugin-intl'
import { Strip } from './strip'
import './header.module.scss'

type HeaderProps = {
  opaque?: boolean
}

export function Header(props: HeaderProps) {
  const intl = useIntl()

  return (
    <header className="header">
      <Strip />
      <div>
        <h1>
          <Link to={`/${intl.locale}/`}>{intl.formatMessage({ id: 'title' })}</Link>
        </h1>
      </div>
    </header>
  )
}
