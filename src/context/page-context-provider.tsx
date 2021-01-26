import React, { ReactNode, useState } from 'react'
import { ToNavigationData } from 'src/context/query-mapper'
import { PageContext, PageContextType } from './page-context'
import { NavigationData } from 'src/types/NavigationData'

interface PageContextProviderProps {
  children: ReactNode
  navigationData: any
  location: any
}

export const PageContextProvider = ({ children, navigationData, location }: PageContextProviderProps) => {
  const [context, setContext] = useState<PageContextType>({
    navigation: ToNavigationData(navigationData.nodes),
    location,
  })

  return <PageContext.Provider value={context}>{children}</PageContext.Provider>
}
