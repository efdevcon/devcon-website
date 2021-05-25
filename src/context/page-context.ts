import { createContext, useContext } from 'react'
import { NavigationData } from 'src/types/NavigationData'
import { Notification } from 'src/types/Notification'
import { Tag } from 'src/types/Tag'

export interface PageContextType {
  navigation: NavigationData
  notification: Notification
  location: any
  tags: Array<Tag>
}

export const usePageContext = () => useContext<PageContextType | undefined>(PageContext)
export const PageContext = createContext<PageContextType | undefined>(undefined)
