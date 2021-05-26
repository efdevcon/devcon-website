import React from 'react'
import css from './page-hero.module.scss'
import { Link } from 'src/components/common/link'
import useGetElementHeight from 'src/hooks/useGetElementHeight'
import usePageCategory from './usePageCategory'
import useIsScrolled from 'src/hooks/useIsScrolled'
import { usePageContext } from 'src/context/page-context'

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
  background?: string
  cta?: Array<CTALink>
  renderCustom?(props?: any): JSX.Element
  navigation?: Array<NavigationLink>
}

export const PageHero = (props: PageHeroProps) => {
  const pageContext = usePageContext()
  const stripHeight = useGetElementHeight('strip')
  const headerHeight = useGetElementHeight('header')
  const pageHeaderHeight = useGetElementHeight('page-navigation')
  const pageHeroHeight = useGetElementHeight('page-hero')
  const negativeOffset = `-${pageHeroHeight - pageHeaderHeight - headerHeight}px`
  const pageCategory = usePageCategory()
  const isScrolled = useIsScrolled()

  let style: any = {
    '--negative-offset': negativeOffset,
    '--strip-height': `${stripHeight}px`,
  }

  if (props.background) {
    style.backgroundImage = `url(${props.background})`
    style.backgroundSize = 'cover'
  }

  return (
    <div
      id="page-hero"
      className={`${css['hero']} ${props.background ? css['custom-background'] : ''} ${
        isScrolled ? css['scrolled'] : ''
      }`}
      style={style}
    >
      <div className="section">
        <div className={css['info']}>
          <p className={`${css['page-category']} font-xs text-uppercase`}>{pageCategory}</p>

          <div className={css['title-block']}>
            <h1 className="font-massive">{props.title || pageContext?.current?.title}</h1>

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
              {props.navigation &&
                props.navigation.map(link => {
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
