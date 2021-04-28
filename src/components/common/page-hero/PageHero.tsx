import React from 'react'
import css from './page-hero.module.scss'
import { Link } from 'src/components/common/link'
import useGetElementHeight from 'src/hooks/useGetElementHeight'
import usePageCategory from './usePageCategory'
import useIsScrolled from 'src/hooks/useIsScrolled'

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
  title?: string
  logo?: any
  cta?: Array<CTALink>
  type: 'contribute' | 'about' | 'location' | 'dip'
  renderCustom?(props?: any): JSX.Element
  navigation?: Array<NavigationLink>
}

export const PageHero = (props: PageHeroProps) => {
  const stripHeight = useGetElementHeight('strip')
  const headerHeight = useGetElementHeight('header')
  const pageHeaderHeight = useGetElementHeight('page-navigation')
  const pageHeroHeight = useGetElementHeight('page-hero')
  const negativeOffset = `-${pageHeroHeight - pageHeaderHeight - headerHeight}px`
  const pageCategory = usePageCategory()
  const isScrolled = useIsScrolled()

  console.log(stripHeight, headerHeight)

  return (
    <div
      id="page-hero"
      className={`${css['hero']} ${isScrolled ? css['scrolled'] : ''}`}
      style={{ '--negative-offset': negativeOffset, '--strip-height': `${stripHeight}px` }}
    >
      <div className={css[props.type]}>
        <img alt="" src={props.logo} />
      </div>
      <div className="section">
        <div className={css['info']}>
          <p className="font-xs text-uppercase">{pageCategory}</p>

          <div className={css['title-block']}>
            <h1 className="font-massive">{props.title}</h1>

            {props.cta && (
              <div className={css['buttons']}>
                {props.cta.map((link: CTALink) => {
                  return (
                    <Link key={link.to + link.title} className="button white lg" to={link.to}>
                      {link.icon}
                      <span>{link.title}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {props.renderCustom && props.renderCustom()}

          {props.navigation && (
            <div id="page-navigation" className={css['page-navigation']}>
              {props.navigation.map(link => {
                return (
                  <Link
                    key={link.to + link.title}
                    to={link.to}
                    indicateExternal
                    className="font-xs bold text-uppercase"
                  >
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
