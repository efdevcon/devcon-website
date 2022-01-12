import { UserAppState } from "./UserAppState";

export interface UserAccount {
  _id: any
  username?: string
  email?: string
  addresses: Array<string>
  disabled: boolean
  pushSubscription: any,
  createdAt: Date
  updatedAt: Date
  nonce: number
  expires: Date
  appState?: UserAppState
}
