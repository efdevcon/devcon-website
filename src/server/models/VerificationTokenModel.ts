import { Document, model, Schema } from 'mongoose'
import { VerificationToken } from 'src/types/VerificationToken'

interface VerificationTokenModel extends VerificationToken, Document {}

const schema: Schema = new Schema(
  {
    identifier: { type: String },
    nonce: { type: Number },
    issued: { type: Date, default: new Date() },
    expires: { type: Date },
  },
  { timestamps: false }
)

export default model<VerificationTokenModel>('VerificationToken', schema)