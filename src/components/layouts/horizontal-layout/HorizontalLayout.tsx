import React, { Ref } from 'react'
import css from './horizontal-layout.module.scss'
import { Navigation } from './Navigation'
import leftPad from 'src/utils/left-pad'
import { Link } from 'src/components/common/link'

import IconGithub from 'src/assets/icons/github.svg'
import IconGlobe from 'src/assets/icons/globe.svg'
import IconDiscussion from 'src/assets/icons/discussion.svg'

type PageProps = {
  title: string
  index?: string
  children: React.ReactNode
}

type LinkType = {
  title: string
  url: string
  icon?: 'github' | 'forum' | 'web'
}

type PageContentProps = {
  backgroundText?: string
  links?: LinkType[]
  bottomLinks?: LinkType[]
  title?: string
  index?: string
  children: React.ReactNode
}

export const Page = React.forwardRef((props: PageProps, ref: Ref<any>) => {
  return (
    <div className={css['page']} ref={ref}>
      {React.Children.map(props.children, Child => {
        return React.cloneElement(Child, {
          title: props.title,
          index: props.index,
        })
      })}
    </div>
  )
})

export const PageContent = (props: PageContentProps) => {
  const renderIcon = (type: string) => {
    if (!type) return <></>

    switch (type) {
      case 'github':
        return (
          <span className={`${css['icon-link']}`}>
            <IconGithub />
          </span>
        )
      case 'forum':
        return (
          <span className={`${css['icon-link']}`}>
            <IconDiscussion />
          </span>
        )
      case 'web':
        return (
          <span className={`${css['icon-link']}`}>
            <IconGlobe />
          </span>
        )
    }
  }

  return (
    <div className={css['layer']}>
      <div className={css['header']}>
        <h3 className={`${css['page-title']} no-select`} data-index={props.index}>
          {props.title}
        </h3>

        <h2 className={`${css['background-text-gradient']} no-select`}>
          {props.backgroundText.split(' ').map((word, index) => {
            return <span key={index}>{word}</span>
          })}
        </h2>

        {props.links && (
          <div className={`${css['links']} no-select`}>
            {props.links.map((link: LinkType) => {
              return (
                <h3 key={link.url}>
                  <Link to={link.url} className={css['link-class']}>
                    {link.icon && renderIcon(link.icon)}
                    {link.title}
                  </Link>
                </h3>
              )
            })}
          </div>
        )}
      </div>

      <div
        className={css['content']}
        onMouseDown={e => e.stopPropagation()}
        onScroll={e => {
          if (scrollTimeout) e.preventDefault()
        }}
        onWheel={e => {
          if (!recentlyScrolled) {
            e.nativeEvent.stopImmediatePropagation()
          }
        }}
      >
        <div>{props.children}</div>
      </div>
    </div>
  )
}

let recentlyScrolled = false
let scrollTimeout: NodeJS.Timeout
const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

export const HorizontalLayout = (props: any) => {
  const [scrollX, setScrollX] = React.useState(0)
  const [trackWidth, setTrackWidth] = React.useState(0)
  const [pageWidth, setPageWidth] = React.useState(0)
  const dragging = React.useRef<boolean>(false)
  const trackRef = React.useRef<HTMLDivElement>()
  const pages = props.children
  const pageRefs = React.useRef<any>({})

  React.useEffect(() => {
    const scrollHandler = (e: any) => {
      const scrolledDown = e.deltaY > 0

      const pixelsToMove = scrolledDown ? 100 : -100
      setScrollX(x => Math.min(trackWidth - pageWidth, Math.max(0, x + pixelsToMove)))

      recentlyScrolled = true

      if (scrollTimeout) clearTimeout(scrollTimeout)

      scrollTimeout = setTimeout(() => {
        recentlyScrolled = false
      }, 500)
    }

    document.addEventListener('wheel', scrollHandler)

    return () => {
      document.removeEventListener('wheel', scrollHandler)
    }
  }, [trackWidth, pageWidth])

  React.useLayoutEffect(() => {
    if (isTouchDevice) return

    if (window.ResizeObserver) {
      const el = trackRef.current

      const observer = new window.ResizeObserver(entries => {
        const entry = entries[0]
        const borderBoxSize = entry.borderBoxSize[0] || entry.borderBoxSize
        setPageWidth(borderBoxSize.inlineSize)
        setTrackWidth(el.scrollWidth)
        setScrollX(x => Math.min(trackWidth - pageWidth, x))
      })

      observer.observe(el)

      return () => {
        observer.unobserve(el)
      }
    }
  }, [trackWidth, pageWidth])

  const onDragEnd = () => {
    if (dragging.current === false) return
    if (isTouchDevice) return
    // Resync state when dragging ends
    setScrollX(dragging.current)

    dragging.current = false
    trackRef.current.style.transition = ''
    trackRef.current.style.cursor = ''
  }

  return (
    <div className={css['layout-container']}>
      <Navigation
        links={props.links}
        setScrollX={setScrollX}
        pages={pages}
        pageTrackRef={trackRef}
        pageRefs={pageRefs}
      />

      <div
        ref={trackRef}
        // Record current X when dragging begins
        onMouseDown={e => {
          e.preventDefault()

          dragging.current = scrollX
        }}
        onMouseLeave={onDragEnd}
        onMouseUp={onDragEnd}
        onMouseMove={e => {
          if (isTouchDevice) return
          if (dragging.current === false) return
          e.preventDefault()

          const lastX = dragging.current
          const speed = 1.5
          const nextX = Math.min(trackWidth - pageWidth, Math.max(0, lastX - e.movementX * speed))

          // Animate element directly for performance - resync state when drag ends.
          trackRef.current.style.transform = `translateX(-${nextX}px)`
          // Disable transition (enabled for smoother scrolling), because it works poorly when dragging
          trackRef.current.style.transition = 'none'
          trackRef.current.style.cursor = 'grabbing'
          dragging.current = nextX
        }}
        className={css['page-track']}
        style={{ transform: `translateX(${-scrollX}px)` }}
      >
        {React.Children.map(pages, (Page, index) => {
          return React.cloneElement(Page, {
            ref: (ref: HTMLDivElement) => {
              pageRefs.current[Page.props.title] = ref
            },
            index: leftPad(index + 1 + ''),
          })
        })}
      </div>
    </div>
  )
}
