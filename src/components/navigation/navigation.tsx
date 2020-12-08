import React from 'react'
import { Link } from 'gatsby'
import { useIntl } from 'gatsby-plugin-intl'
import { PageContentType } from 'src/types/baseContentType'
import { useSiteNavigation } from 'src/hooks/useSiteNavigation'

export function Navigation() {
  const intl = useIntl()
  const lang = intl.locale === 'es' ? 'es' : 'en'
  const pages = useSiteNavigation(lang)

  return (
    <ul className="navigation">
      {pages.map((i: any) => (
        <li key={i.path}>
          <Link to={i.path}>{i.title}</Link>

          <ul>
            {i.children.map((c: PageContentType) => (
              <li key={c.path}>
                <Link to={c.path}>{c.title}</Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}
