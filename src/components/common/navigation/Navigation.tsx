import React from 'react'
import { Link } from 'gatsby'
import { useIntl } from 'gatsby-plugin-intl'
import { Page } from 'src/types/Page'
import { useSiteNavigation } from 'src/hooks/useSiteNavigation'
import css from './navigation.module.scss'

export function Navigation() {
  const intl = useIntl()
  const lang = intl.locale === 'es' ? 'es' : 'en'
  const pages = useSiteNavigation(lang)

  return (
    <ul className={css['navigation']}>
      {pages.map((i: Page) => (
        <li key={i.slug}>
          <Link to={i.slug}>{i.title}</Link>

          <ul>
            {i.children.map((c: Page) => (
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
