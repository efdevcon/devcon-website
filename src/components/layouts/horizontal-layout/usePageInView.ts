import { useState, useEffect } from 'react'

const usePageInView = (pageRefs: any) => {
  const [pageInView, setPageInView] = useState()

  useEffect(() => {
    const unobserve = []

    Object.entries(pageRefs.current).forEach(([key, page]) => {
      const observer = new window.IntersectionObserver(
        entries => {
          const target = entries[0]

          if (target.intersectionRatio > 0.5) setPageInView(key)
        },
        {
          threshold: 0.5,
        }
      )

      observer.observe(page)

      unobserve.push(() => observer.unobserve(page))
    })

    return () => {
      unobserve.forEach(f => f())
    }
  }, [pageRefs])

  return pageInView
}

export default usePageInView
