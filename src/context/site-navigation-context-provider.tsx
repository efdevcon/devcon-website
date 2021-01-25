import React, { ReactNode, useState } from 'react'
import { ToNavigationData } from 'src/context/query-mapper'
import { SiteNavigationContext, ISiteNavigationContext } from './site-navigation-context'

interface SiteNavigationContextProviderProps {
  children: ReactNode
  data: any
}

export const SiteNavigationContextProvider = ({ children, data }: SiteNavigationContextProviderProps) => {
  const [context, setContext] = useState<ISiteNavigationContext>({ data: ToNavigationData(data.nodes) })

  return (
    <SiteNavigationContext.Provider value={{ data: context.data, setContext: setContext }}>
      {children}
    </SiteNavigationContext.Provider>
  )
}
