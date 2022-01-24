import { VerificationToken } from 'src/types/VerificationToken'
import { BaseRepository } from './BaseRepository'
import { IVerificationTokenRepository } from './interfaces/IVerificationTokenRepository'

const defaultDeletionDate = new Date(new Date().setDate(new Date().getDate() - 30))

export class VerificationTokenRepository extends BaseRepository<VerificationToken> implements IVerificationTokenRepository {
  constructor() {
    super('VerificationToken')

    console.log('Deleting verification tokens older than default deletion date', defaultDeletionDate)
    this.find({ issued: { $lt: defaultDeletionDate } }).then(result => {
      if (result) { 
        console.log('ITEMS DELETED', result.length)
      }
      else { 
        console.log('No items deleted..')
      }
    })
  }  

  public async findValidVerificationToken(identifier: string, nonce: number): Promise<VerificationToken | undefined> {
    try {
      return await this._model.findOne({ 
        identifier: identifier,
        nonce: nonce,
        expires: { $gt: new Date() }
      })
    } catch (e) {
      console.log("Couldn't find verification token", identifier, nonce)
      console.error(e)
    }
  }
}
