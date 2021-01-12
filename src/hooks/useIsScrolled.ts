import { useLayoutEffect, useState } from 'react'

export default () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useLayoutEffect(() => {
    let options = {
      threshold: 1,
    }

    const callback = (entries: any) => {
      const { intersectionRatio } = entries[0]

      if (intersectionRatio < 1) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    const observer = new IntersectionObserver(callback, options)

    observer.observe(document.body)

    return () => {
      observer.unobserve(document.body)
    }
  }, [])

  return isScrolled
}
