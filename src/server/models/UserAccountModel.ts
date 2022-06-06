import { Document, model, Schema } from 'mongoose'
import { UserAccount } from 'types/UserAccount'

interface UserAccountModel extends UserAccount, Document { }

const sessionSchema: Schema = new Schema(
  {
    id: { type: String },
    level: { type: String, enum: ['interested', 'attending'] },
    start: { type: Date },
    end: { type: Date },
  }, {
  _id: false,
  timestamps: false
}
)
const appStateSchema: Schema = new Schema(
  {
    speakers: { type: [String] },
    sessions: [sessionSchema],
  },
  {
    _id: false,
    timestamps: true
  }
)

const schema: Schema = new Schema(
  {
    username: { type: String },
    email: { type: String, match: /.+@.+\..+/ },
    addresses: { type: [String] },
    disabled: { type: Boolean, required: false, default: false },
    appState: appStateSchema,
    pushSubscription: 'Mixed'
  },
  { timestamps: true }
)

let mongooseModel: any
try {
  mongooseModel = model<UserAccountModel>('UserAccount')
} catch (e) {
  mongooseModel = model<UserAccountModel>('UserAccount', schema)
}

export default mongooseModel
