import React from 'react'
import { Link } from 'gatsby'
import { useIntl } from 'gatsby-plugin-intl'
import { PageContentType } from 'src/types/PageContentType'
import { useSiteNavigation } from 'src/hooks/useSiteNavigation'

export function Navigation() {
  const intl = useIntl()
  const lang = intl.locale === 'es' ? 'es' : 'en'
  const pages = useSiteNavigation(lang)

  return (
    <ul className="navigation">
      {pages.map((i: PageContentType) => (
        <li key={i.slug}>
          <Link to={i.slug}>{i.title}</Link>

          <ul>
            {i.children.map((c: PageContentType) => (
              <li key={c.slug}>
                <Link to={c.slug}>{c.title}</Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}
