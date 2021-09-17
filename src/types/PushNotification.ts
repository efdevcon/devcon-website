export interface PushNotification {
  _id?: string
  content: {
    title: string
    message: string
  }
  pushed?: boolean,
  recipient?: any
}
