import { useState, useEffect } from 'react';

const usePageInView = (pageRefs: any) => {
  const [pageInView, setPageInView] = useState();

  console.log(pageRefs, 'prefs')
  
  useEffect(() => {
    const observer = new window.ResizeObserver(entries => {
      console.log(entries, 'what do we have here')
    });

    pageRefs.current.forEach(page => {
      observer.observe(page)
    });

    return () => {
      pageRefs.current.forEach(page => {
        observer.unobserve(page);
      });
    }
  }, []);

  return pageInView;
}

export default usePageInView;