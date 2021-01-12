import React, { useRef, useState } from 'react'
import { useBlogs } from 'src/hooks/useBlogs'
import moment from 'moment'
import css from './blog-overview.module.scss'
import { Card } from '../common/card'
import { BlogPost } from 'src/types/BlogPost'
import ArrowLeft from 'src/assets/icons/arrow_left.svg'
import ArrowRight from 'src/assets/icons/arrow_right.svg'

/*
      TO-DO: 
        Port scrolling functionality to a separate "HorizontalScroller" component
*/

export function BlogOverview() {
  const blogs = useBlogs()
  const refs = useRef<Array<HTMLElement>>([])
  const containerRef = useRef<HTMLDivElement>()
  const [pixelsMoved, setPixelsMoved] = useState(0)
  // const [isLastItem, setIsLastItem] = useState(false)
  const [allItemsVisible, setAllItemsVisible] = useState(false)

  const moveForward = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const elements = refs.current

    // Looping until we find the first element with a horizontal offset higher than the currently moved pixels (which would be the next item)
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]
      const horizontalOffset = element.offsetLeft

      if (horizontalOffset > pixelsMoved) {
        // const horizontalBound = containerRef.current.scrollWidth + containerRef.current.clientWidth
        // const nextPixelsMoved = Math.min(horizontalOffset, horizontalBound)

        setPixelsMoved(horizontalOffset)

        // const isLastItem = i === elements.length - 1

        // if (isLastItem) {
        //   setIsLastItem(true)
        // } else {
        //   setIsLastItem(false)
        // }

        break
      }
    }
  }

  const moveBackward = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const elements = refs.current

    // Looping backwards looking for the first element with a horizontal offset less than the currently moved pixels (which would be the previous item)
    for (let i = elements.length - 1; i >= 0; i--) {
      const element = elements[i]
      const horizontalOffset = element.offsetLeft

      if (horizontalOffset < pixelsMoved) {
        setPixelsMoved(horizontalOffset)

        break
      }
    }
  }

  /* 
    To save some time and deal with edge cases, we reset the scroll distance to 0 whenever the browser resizes 
    (doesn't do anything on mobile because we use native scroll there)
  */
  React.useEffect(() => {
    // Could debounce here, but keeping it simple in first iteration
    const resizeListener = () => {
      setPixelsMoved(0)
      // setIsLastItem(false)
      if (containerRef.current) containerRef.current.scrollTo(0, 0)
    }

    window.addEventListener('resize', resizeListener)

    return () => window.removeEventListener('resize', resizeListener)
  }, [])

  // We observe whenever the last item becomes fully visible, and then disable the next button
  React.useLayoutEffect(() => {
    const lastItem = refs.current[blogs.length - 1]

    let options = {
      threshold: 1.0,
    }

    const callback = (entries: any) => {
      const { intersectionRatio } = entries[0]

      if (intersectionRatio === 1) {
        setAllItemsVisible(true)
      } else if (allItemsVisible) {
        setAllItemsVisible(false)
      }
    }

    const observer = new IntersectionObserver(callback, options)

    observer.observe(lastItem)

    return () => {
      observer.unobserve(lastItem)
    }
  }, [allItemsVisible, blogs])

  return (
    <div className={css['blog-container']}>
      <div className={css['top-section']}>
        <h2 className="section-header">Blog</h2>

        <div className={css['arrows']}>
          <button className={css['arrow-button']} disabled={pixelsMoved === 0} onClick={moveBackward}>
            <ArrowLeft />
          </button>

          <button className={css['arrow-button']} disabled={allItemsVisible} onClick={moveForward}>
            <ArrowRight />
          </button>
        </div>
      </div>

      <div ref={containerRef} className={css['scroll-container']}>
        <div className={css['scroller']} style={{ transform: `translateX(-${pixelsMoved}px)`, '--n': blogs.length }}>
          {blogs.map((blog: BlogPost, i) => (
            <Card
              ref={(ref: HTMLElement) => (refs.current[i] = ref)}
              key={blog.slug}
              title={blog.title}
              imageUrl={blog.imageUrl}
              linkUrl={blog.slug}
              metadata={[moment(blog.date).format('ll'), blog.author]}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
