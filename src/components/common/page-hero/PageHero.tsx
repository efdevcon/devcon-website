import React from 'react'
import css from './page-hero.module.scss'
import { Link } from 'components/common/link'
import useGetElementHeight from 'hooks/useGetElementHeight'
import { usePageCategory } from './usePageCategory'
import { useIsScrolled } from 'hooks/useIsScrolled'
import { usePageContext } from 'context/page-context'
import ChevronLeft from 'assets/icons/chevron_left.svg'
import ChevronRight from 'assets/icons/chevron_right.svg'
import { Button } from 'components/common/button'
import Image from "next/legacy/image"
import SwipeToScroll from 'components/common/swipe-to-scroll'

type NavigationLink = {
  to: string
  title: string
}

type CTALink = {
  to: string
  title: string
  icon: any
}

type Scene = {
  image: any
  imageProps: {
    [key: string]: any
  }
  callToAction: () => JSX.Element
  content: () => JSX.Element
}

type PathSegment = {
  text: string | React.ReactElement
  url?: string
}

type PageHeroProps = {
  title?: string | false
  titleSubtext?: string
  titleClassName?: string
  path?: string | PathSegment[]
  description?: string
  scenes?: Scene[]
  background?: string
  cta?: Array<CTALink>
  renderCustom?(props?: any): JSX.Element
  navigation?: Array<NavigationLink>
  children?: React.ReactNode
}

const PathNavigation = (props: PageHeroProps) => {
  const pagePath = usePageCategory()

  let path

  if (Array.isArray(props.path)) {
    path = props.path.reduce((acc, pathSegment, index) => {
      const { url, text } = pathSegment

      if (url) {
        acc.push(
          <Link key={`${text} ${index}`} className={`hover-underline bold`} to={url}>
            {text}
          </Link>
        )
      } else {
        acc.push(<span key={`${text} ${index}`}>{text}</span>)
      }

      if (index !== (props.path?.length ? props.path.length - 1 : false)) {
        acc.push(<span key={index}>&nbsp;/&nbsp;</span>)
      }

      return acc
    }, [] as React.ReactNode[])
  }

  return <p className={`${css['path']} font-xs text-uppercase`}>{path || props.path || pagePath}</p>
}

export const PageHero = (props: PageHeroProps) => {
  const pageContext = usePageContext()
  // const stripHeight = useGetElementHeight('strip')
  const headerHeight = useGetElementHeight('header-container')
  const pageHeaderHeight = useGetElementHeight('page-navigation')
  const pageHeroHeight = useGetElementHeight('page-hero')
  const negativeOffset = `-${pageHeroHeight - pageHeaderHeight - headerHeight}px`
  const isScrolled = useIsScrolled()
  const [currentScene, setCurrentScene] = React.useState(0)

  let style: any = {
    '--negative-offset': negativeOffset,
    // '--strip-height': `${stripHeight}px`,
  }

  if (props.background) {
    style.backgroundImage = `url(${props.background})`
    style.backgroundSize = 'cover'
  }

  let className = `${css['hero']} margin-bottom`

  if (props.background) className += ` ${css['custom-background']}`
  if (isScrolled) className += ` ${css['scrolled']}`
  if (props.navigation) className += ` ${css['with-navigation']}`
  if (props.scenes) className += ` ${css['with-scenes']}`
  if (props.children) className += ` ${css['as-background']}`

  const setNextScene = React.useMemo(
    () => (increment: number) => {
      const nextScene = currentScene + increment
      if (!props.scenes) return

      if (nextScene >= props.scenes.length) {
        setCurrentScene(0)
      } else if (nextScene < 0) {
        setCurrentScene(props.scenes.length - 1)
      } else {
        setCurrentScene(nextScene)
      }
    },
    [currentScene, setCurrentScene, props.scenes]
  )

  // Auto scroll through images
  React.useEffect(() => {
    if (props.scenes) {
      const timeout = setTimeout(() => {
        setNextScene(1)
      }, 1000 * 8)

      return () => clearTimeout(timeout)
    }
  }, [props.scenes, setNextScene])

  const title = props.title ?? pageContext?.current?.header ?? pageContext?.current?.title

  return (
    <div id="page-hero" className={className} style={style}>
      <div className="section">
        <div className={css['info']}>
          <PathNavigation {...props} />

          {title && (
            <div className={css['title-block']} data-type="page-hero-title-block">
              <h1
                className={`font-massive-2 ${props.titleSubtext ? css['subtext'] : ''} ${
                  props.titleClassName ? props.titleClassName : ''
                }`}
              >
                {title}
                {props.titleSubtext && <span>{props.titleSubtext}</span>}
              </h1>
              {props.description && <span className={css['description']}>{props.description}</span>}

              {props.cta && (
                <div className={css['buttons']}>
                  {props.cta.map((link: CTALink) => {
                    return (
                      <Link key={link.to + link.title} className="button black ghost lg bold" to={link.to}>
                        {link.icon}
                        <span>{link.title}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {props.children}

          {props.scenes && (
            <div className={css['scenes']}>
              {props.scenes.map((scene: any, i: number) => {
                const selected = i === currentScene

                let className = css['scene']

                if (selected) className += ` ${css['active']}`

                return (
                  <div key={i} className={className}>
                    {scene.content()}
                  </div>
                )
              })}

              <div className={css['controls-dots']}>
                {props.scenes.map((_: any, i: number) => {
                  const selected = i === currentScene

                  let className = css['dot']

                  if (selected) className += ` ${css['active']}`

                  return (
                    <div key={i} className={className} onClick={() => setCurrentScene(i)}>
                      <div className={css['circle']}></div>
                    </div>
                  )
                })}
              </div>

              <div className={css['controls']}>
                {props.scenes[currentScene].callToAction()}

                <div className={css['arrows']}>
                  <Button
                    className={`${css['arrow']} white squared`}
                    aria-label="View previous slide"
                    onClick={() => setNextScene(-1)}
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    className={`${css['arrow']} white squared`}
                    aria-label="View next slide"
                    onClick={() => setNextScene(1)}
                  >
                    <ChevronRight />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {props.renderCustom && props.renderCustom()}
        </div>
      </div>
      {props.navigation && (
        <div className={`${css['page-navigation-container']} section`}>
          <div className="expand-right">
            <SwipeToScroll scrollIndicatorDirections={{ right: true }}>
              <div id="page-navigation" className={`${css['page-navigation']}`}>
                {props.navigation &&
                  props.navigation.map(link => {
                    return (
                      <Link
                        key={link.to + link.title}
                        to={link.to}
                        indicateExternal
                        className="font-xs bold text-uppercase hover-underline"
                      >
                        {link.title}
                      </Link>
                    )
                  })}
              </div>
            </SwipeToScroll>
          </div>
        </div>
      )}

      {props.scenes?.map((scene, i: number) => {
        const selected = i === currentScene

        let className = css['scene-background-image']

        if (selected) className += ` ${css['active']}`

        return (
          <div key={i} className={className}>
            <Image src={scene.image} alt={scene.imageProps.alt || `Scene ${i}`} {...scene.imageProps} />
          </div>
        )
      })}
    </div>
  )
}
