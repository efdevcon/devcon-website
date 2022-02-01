import { createContext, useContext } from 'react'
import { NavigationData } from 'types/NavigationData'
import { Notification } from 'types/Notification'
import { Page } from 'types/Page'

export interface PageContextType {
  navigation: NavigationData
  notification: Notification
  location: any
  current: Page | undefined
  data: any
}

export const usePageContext = () => useContext<PageContextType | undefined>(PageContext)
export const PageContext = createContext<PageContextType | undefined>(undefined)
