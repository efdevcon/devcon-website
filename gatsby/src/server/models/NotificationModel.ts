import { Document, model, Schema } from 'mongoose'
import { PushNotification } from 'src/types/PushNotification'

interface NotificationModel extends PushNotification, Document {}

const userAccountSchema: Schema = new Schema(
  {
    content: {
      title: String,
      message: String
    },
    // Whether or not the notification has been pushed to the service worker (or service workers, if it's a global message)
    pushed: { type: Boolean, default: false },
    // A lack of recipient implies it should be sent to everyone (query by missing field)
    recipient: { type: Schema.Types.ObjectId, ref: 'UserAccount', index: true },
  },
  { timestamps: true }
)

export default model<NotificationModel>('Notification', userAccountSchema)
