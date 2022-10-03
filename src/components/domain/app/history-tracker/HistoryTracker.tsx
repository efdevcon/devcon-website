import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'

type HistoryTrackerProps = {
  children?: any
}

const Context = createContext<number>(0)

export const useHistory = () => {
  return useContext(Context)
}

export const HistoryTracker = (props: HistoryTrackerProps) => {
  const [prevRoute, setPrevRoute] = useState<string | null>(null)
  // We count depth once we are inside /app, adding and subtracting as we go forward or backwards in history
  // When depth is 1 and we pop state, it means we are at the initial route, and there is nothing to go back to within the context of the app, meaning we can set the history to null
  const [depth, setDepth] = useState(0)
  const router = useRouter()
  const initialPage = useRef()

  // console.log(depth, 'depthe')

  // console.log(typeof window !== undefined && window.history.length, 'length hist')
  // useEffect(() => {
  //   console.log(window.history.length, 'length hist')
  // }, [depth])

  // useEffect(() => {
  //   const handler = () => {
  //     console.log(window.history.length, 'history length')
  //   }

  //   // window.onpopstate = () => console.log('hlelo wtf')
  //   // window.onpushtate = handler;

  //   window.addEventListener('popstate', handler)
  //   window.addEventListener('pushstate', handler)
  //   addEventListener('hashchange', handler)

  //   return () => {
  //     window.removeEventListener('popstate', handler)
  //     window.removeEventListener('pushstate', handler)
  //     window.removeEventListener('hashchange', handler)
  //   }
  // }, [])
  useEffect(() => {
    history.replaceState({ page: history.length, href: location.href }, 'foo')
    // initialPage.current = history.length
  }, [])

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const isBackNavigation = url.includes(prevRoute || 'aæ.æeaæ.') // === router.pathname

      // console.log(url)

      // if (history.state.page === initialPage.current) {
      //   console.log('supposedly at the first page now')
      // } else {
      //   console.log(history.length, 'length')
      // }

      // console.log(window.state.page === 1, 'length of hist')
      if (isBackNavigation) {
        setDepth(depth => depth - 1)
      } else {
        setDepth(depth => depth + 1)
      }

      setPrevRoute(url)

      // console.log(isBackNavigation, 'is back nav')

      // if (router.pathname.startsWith('/app')) {
      //   setPrevRoute(router.pathname)
      // } else {
      //   setDepth(0)

      //   return
      // }

      // if (true /*isBackNavigation*/) {
      //   setDepth(depth => depth - 1)
      // } else {
      //   setDepth(depth => depth + 1)
      // }
    }

    // router.beforePopState(() => {
    //   console.log('pop state')
    //   setDepth(depth => depth - 2) // if we're going back in history, we have to overcompensate because we are incrementing the counter in the routeChange handler

    //   return true
    // })

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [prevRoute, router.events, router.pathname])

  // console.log(depth, 'depth')

  return <Context.Provider value={depth}>{props.children}</Context.Provider>
}
