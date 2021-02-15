import { createContext, useContext } from 'react'
import { NavigationData } from 'src/types/NavigationData'

export interface PageContextType {
  navigation: NavigationData
  location: any
}

export const usePageContext = () => useContext<PageContextType | undefined>(PageContext)
export const PageContext = createContext<PageContextType | undefined>(undefined)
