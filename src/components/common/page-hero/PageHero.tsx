import React from 'react'
import css from './page-hero.module.scss'
import { Link } from 'src/components/common/link'
import { Link as LinkType } from 'src/types/Link'
import { useSiteNavigationContext } from 'src/context/site-navigation-context'
import useGetElementHeight from 'src/hooks/useGetElementHeight'

type NavigationLink = {
  to: string
  title: string
}

type CTALink = {
  to: string
  title: string
  icon: any
}

type PageHeroProps = {
  title: string
  logo?: any
  cta?: Array<CTALink>
  type: 'dip' | 'faq',
  navigation: Array<NavigationLink>
}

const resolvePageCategory = (link: LinkType, parent?: string): undefined | JSX.Element => {
  const match = link.url.includes(window.location.pathname)

  if (match) {
    if (parent)
      return (
        <>
          {parent} / <b>{link.title}</b>
        </>
      )

    return <b>{link.title}</b>
  }

  if (link.links) {
    for (let i = 0; i < link.links.length; i++) {
      const match = resolvePageCategory(link.links[i], link.title)

      if (match) return match
    }
  }
}

export const PageHero = (props: PageHeroProps) => {
  const { data } = useSiteNavigationContext()
  const headerHeight = useGetElementHeight('header')
  const pageHeaderHeight = useGetElementHeight('page-navigation')
  const pageHeroHeight = useGetElementHeight('page-hero')
  const negativeOffset = `-${pageHeroHeight - pageHeaderHeight - headerHeight}px`

  const pageCategory = data.site.reduce((acc: null | JSX.Element, link) => {
    const category = resolvePageCategory(link)

    if (category) acc = category

    return acc
  }, null)

  return (
    <div id="page-hero" className={css['hero']} style={{ '--negative-offset': negativeOffset }}>
      <div className={css[props.type]}>
        <img alt="" src={props.logo} />
      </div>
      <div className="section">
        <div className={css['info']}>
          <p className="font-xs text-uppercase">{pageCategory}</p>

          <div className={css['title-block']}>
            <h1>{props.title}</h1>

            {props.cta && (
              <div className={css['buttons']}>
                {props.cta.map((link: CTALink) => {
                  return (
                    <Link className="button lg" to={link.to}>
                      {link.icon}
                      <span>{link.title}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {props.navigation && (
            <div id="page-navigation" className={css['page-navigation']}>
              {props.navigation.map(link => {
                return (
                  <Link to={link.to} indicateExternal className="font-xs bold font-secondary text-uppercase">
                    {link.title}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
