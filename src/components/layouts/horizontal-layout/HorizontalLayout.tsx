import React, { Ref } from 'react'
import css from './horizontal-layout.module.scss'
import { Navigation } from './Navigation'
import leftPad from 'src/utils/left-pad'
import { Link } from 'src/components/common/link'

type PageProps = {
  title: string
  index?: string
  children: React.ReactNode
}

type LinkType = {
  title: string
  url: string
  icon?: string
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
  return (
    <div className={css['layer']}>
      <div className={css['header']}>
        <h3 className={css['page-title']} data-index={props.index}>
          {props.title}
        </h3>

        <h2 className={css['background-text']}>
          {props.backgroundText.split(' ').map((word, index) => {
            return <span key={index}>{word}</span>
          })}
        </h2>

        {props.links && (
          <div className={css['links']}>
            {props.links.map((link: LinkType) => {
              return (
                <h3 key={link.url}>
                  <Link to={link.url} indicateExternal>
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
        onWheel={e => {
          if (!recentlyScrolled) {
            e.nativeEvent.stopImmediatePropagation()
          } else {
            e.stopPropagation()
          }
        }}
      >
        {props.children}
      </div>
    </div>
  )
}

let recentlyScrolled = false
let scrollTimeout

export const HorizontalLayout = (props: any) => {
  const [scrollX, setScrollX] = React.useState(0)
  const [trackWidth, setTrackWidth] = React.useState(0)
  const [pageWidth, setPageWidth] = React.useState(0)
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

  return (
    <div className={css['layout-container']}>
      <Navigation setScrollX={setScrollX} pages={pages} pageRefs={pageRefs} />

      <div ref={trackRef} className={css['page-track']} style={{ transform: `translateX(${-scrollX}px)` }}>
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
