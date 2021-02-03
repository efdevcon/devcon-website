import { useLayoutEffect, useState } from 'react'

export default () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useLayoutEffect(() => {
    
    const handleScroll = () => {
      const scrolled = window.scrollY > 0; // Reading scrollY causes repaint; keep an eye out for perf issues
      
      setIsScrolled(scrolled);
    }
    
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);

    // let options = {
    //   threshold: [0, 1],
    // }

    // const callback = (entries: any) => {
    //   const { intersectionRatio } = entries[0]

    //   console.log(intersectionRatio, 'ratio')

    //   if (intersectionRatio < 1) {
    //     setIsScrolled(true)
    //   } else {
    //     setIsScrolled(false)
    //   }
    // }

    // const observer = new IntersectionObserver(callback, options)

    // observer.observe(document.body)

    // return () => {
    //   observer.unobserve(document.body)
    // }
  }, [])

  return isScrolled
}
