import React, { ReactNode, useEffect, useState } from 'react'
import { ToNavigationData } from 'src/context/query-mapper'
import { SiteNavigationContext, DefaultSiteNavigationContext, ISiteNavigationContext } from './site-navigation-context'

interface SiteNavigationContextProviderProps {
  children: ReactNode
  data: any
}

export const SiteNavigationContextProvider = ({ children, data }: SiteNavigationContextProviderProps) => {
  const [context, setContext] = useState<ISiteNavigationContext>(DefaultSiteNavigationContext)

  useEffect(() => {
    const navigationData = ToNavigationData(data.nodes)

    setContext({ data: navigationData })
  }, [data])

  return (
    <SiteNavigationContext.Provider value={{ data: context.data, setContext: setContext }}>
      {children}
    </SiteNavigationContext.Provider>
  )
}
