import { Document, model, Schema, Mixed } from 'mongoose'
import { UserAccount } from 'src/types/UserAccount'

interface UserAccountModel extends UserAccount, Document {}

const userAccountSchema: Schema = new Schema(
  {
    username: { type: String },
    email: { type: String, match: /.+@.+\..+/ },
    addresses: { type: [String] },
    disabled: { type: Boolean, required: false, default: false },
    nonce: { type: Number },
    expires: { type: Date },
    pushSubscription: 'Mixed'
  },
  { timestamps: true }
)

export default model<UserAccountModel>('UserAccount', userAccountSchema)
