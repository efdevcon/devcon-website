import React from 'react'
import { useSiteNavigation } from 'src/hooks/useSiteNavigation'
import IconMenu from 'src/assets/icons/menu.svg'
import IconArrowDown from 'src/assets/icons/arrow_drop_down.svg'
import { useIntl } from 'gatsby-plugin-intl'
import { Page } from 'src/types/Page'
import { Link } from 'src/components/common/link'
import css from './navigation.module.scss'

export const Navigation = () => {
  const intl = useIntl()
  const lang = intl.locale === 'es' ? 'es' : 'en'
  const pages = useSiteNavigation(lang)

  return (
    <>
      <ul className={css['navigation']}>
        {pages.map((i: Page) => {
          const hasChildren = i.children && i.children.length > 0

          const link = (
            <Link className={`${css['foldout-link']} plain`} to={i.slug}>
              {i.title}
            </Link>
          )

          return (
            <li className="plain" key={i.slug}>
              {hasChildren ? (
                <>
                  {i.title}
                  <IconArrowDown style={{ width: '10px', height: '5px', margin: '8px' }} />
                  <div className={css['foldout']}>
                    {link}
                    {i.children.map((c: Page) => (
                      <ul key={c.slug}>
                        <li className={`${css['foldout-link']} plain`} key={c.slug}>
                          <Link to={c.slug}>{c.title}</Link>
                        </li>
                      </ul>
                    ))}
                  </div>
                </>
              ) : (
                link
              )}
            </li>
          )
        })}
      </ul>

      <IconMenu style={{ width: '30px', height: '20px', marginLeft: '28px', cursor: 'pointer' }} />
    </>
  )
}
