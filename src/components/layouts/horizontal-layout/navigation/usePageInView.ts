import { useState, useEffect } from 'react'

export const hashSlug = (slug: string) => '#' + slug.replaceAll(' ', '-').toLowerCase()

const usePageInView = (pageRefs: any) => {
  const [pageInView, setPageInView] = useState();

  useEffect(() => {
    const unobserve = []

    Object.entries(pageRefs.current).forEach(([pageTitle, page]) => {
      const observer = new window.IntersectionObserver(entries => {
        const target = entries[0];
  
        if (target.intersectionRatio > 0.5) {
          setPageInView(pageTitle)
          window.location.replace(hashSlug(pageTitle))
        }
      }, { 
        threshold: 0.5
      });

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
