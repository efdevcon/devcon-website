import { Document, model, Schema } from 'mongoose'
import { PushNotification } from 'src/types/PushNotification'

interface NotificationModel extends PushNotification, Document {}

const userAccountSchema: Schema = new Schema(
  {
    content: {
      title: String,
      message: String
    },
    global: { type: Boolean, index: true },
    recipient: { type: Schema.Types.ObjectId, ref: 'UserAccount', index: true },
  },
  { timestamps: true }
)

export default model<NotificationModel>('Notification', userAccountSchema)
