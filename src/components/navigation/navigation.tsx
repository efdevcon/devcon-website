import React from 'react'
import { Link } from 'gatsby'
import { useIntl } from 'gatsby-plugin-intl'
import { PageContentType } from 'src/types/baseContentType'
import { useSiteNavigation } from 'src/hooks/useSiteNavigation'
import { useSpanishNavigation } from 'src/hooks/useSpanishNavigation'

export function Navigation() {
  const intl = useIntl()
  const spanish = useSpanishNavigation()
  const english = useSiteNavigation()
  const pages = intl.locale === 'es' ? spanish : english

  return (
    <ul className="navigation">
      {pages.map((i: PageContentType) => (
        <li key={i.id}>
          <Link to={i.path}>{i.title}</Link>
        </li>
      ))}
    </ul>
  )
}
