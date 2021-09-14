export interface PushNotification {
  _id: string
  content: {
    title: string
    message: string
  }
  global: boolean
  recipient: string
}
