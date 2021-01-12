import { createContext, useContext } from 'react'
import { Link } from 'src/types/Link'
import { NavigationData } from 'src/types/NavigationData'

export const DefaultSiteNavigationContext = {
  data: {
    top: new Array<Link>(),
    site: new Array<Link>(),
    footer: {
      bottom: new Array<Link>(),
      highlights: new Array<Link>(),
      left: new Array<Link>(),
      right: new Array<Link>(),
    },
  } as NavigationData,
  setContext: () => {},
}

export interface ISiteNavigationContext {
  data: NavigationData
}

export interface SiteNavigationContextType {
  data: NavigationData
  setContext: (context: ISiteNavigationContext) => void
}

export const useSiteNavigationContext = () => useContext(SiteNavigationContext)

export const SiteNavigationContext = createContext<SiteNavigationContextType>(DefaultSiteNavigationContext)
