import React from 'react'
import css from './page-hero.module.scss'
import { Link } from 'src/components/common/link'
import useGetElementHeight from 'src/hooks/useGetElementHeight'
import usePagePath from './usePageCategory'
import useIsScrolled from 'src/hooks/useIsScrolled'
import { usePageContext } from 'src/context/page-context'
import ChevronLeft from 'src/assets/icons/chevron_left.svg'
import ChevronRight from 'src/assets/icons/chevron_right.svg'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

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
  text: string
  url?: string
}

type PageHeroProps = {
  title?: string
  titleSubtext?: string
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
  const pagePath = usePagePath()

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

      if (index !== props.path.length - 1) {
        acc.push(<span key={index}>&nbsp;/&nbsp;</span>)
      }

      return acc
    }, [] as React.ReactNode[])
  }

  return <p className={`${css['path']} font-xs text-uppercase`}>{path || props.path || pagePath}</p>
}

export const PageHero = (props: PageHeroProps) => {
  const pageContext = usePageContext()
  const stripHeight = useGetElementHeight('strip')
  const headerHeight = useGetElementHeight('header')
  const pageHeaderHeight = useGetElementHeight('page-navigation')
  const pageHeroHeight = useGetElementHeight('page-hero')
  const negativeOffset = `-${pageHeroHeight - pageHeaderHeight - headerHeight}px`
  const isScrolled = useIsScrolled()
  const [currentScene, setCurrentScene] = React.useState(0)

  console.log(pageHeroHeight, pageHeaderHeight, headerHeight, 'pagehero/pageheader/header')

  let style: any = {
    '--negative-offset': negativeOffset,
    '--strip-height': `${stripHeight}px`,
  }

  console.log(headerHeight, 'header height')

  if (props.background) {
    style.backgroundImage = `url(${props.background})`
    style.backgroundSize = 'cover'
  }

  let className = `${css['hero']} margin-bottom`

  if (props.background) className += ` ${css['custom-background']}`
  if (isScrolled) className += ` ${css['scrolled']}`
  if (props.navigation) className += ` ${css['with-navigation']}`
  if (props.children) className += ` ${css['as-background']}`

  const setNextScene = React.useMemo(
    () => (increment: number) => {
      const nextScene = currentScene + increment

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

  React.useEffect(() => {
    if (props.scenes) {
      const timeout = setTimeout(() => {
        setNextScene(1)
      }, 1000 * 5)

      return () => clearTimeout(timeout)
    }
  }, [setNextScene])

  return (
    <div id="page-hero" className={className} style={style}>
      <div className="section">
        <div className={css['info']}>
          <PathNavigation {...props} />

          <div className={css['title-block']}>
            <h1 className={`${props.titleSubtext ? css['subtext'] : ''} font-massive-2`}>
              {props.title ?? pageContext?.current?.title}
              {props.titleSubtext && <span>{props.titleSubtext}</span>}
            </h1>
            {props.description && <span className={css['description']}>{props.description}</span>}

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
                  <button className={`${css['arrow']} red squared`} onClick={() => setNextScene(-1)}>
                    <ChevronLeft />
                  </button>
                  <button className={`${css['arrow']} red squared`} onClick={() => setNextScene(1)}>
                    <ChevronRight />
                  </button>
                </div>
              </div>
            </div>
          )}

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

      {props.scenes?.map((scene, i: number) => {
        const selected = i === currentScene

        let className = css['scene-background-image']

        if (selected) className += ` ${css['active']}`

        return (
          <div key={i} className={className}>
            <img src={scene.image} {...scene.imageProps} />
            {/* Use optimized images asap */}
            {/* <GatsbyImage image={getImage(scene.image)} {...scene.imageProps} placeholder="blurred" layout="fullWidth" /> */}
          </div>
        )
      })}
    </div>
  )
}
