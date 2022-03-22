import { UserAppState } from "./UserAppState";

export interface UserAccount {
  _id?: any
  username?: string
  email?: string
  activeAddress?: string
  addresses: Array<string>
  disabled: boolean
  pushSubscription: any,
  createdAt: Date
  updatedAt: Date
  appState?: UserAppState
  rawAppState?: string
}
