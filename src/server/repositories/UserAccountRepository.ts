import { UserAccount } from 'types/UserAccount'
import { UserAppState } from 'types/UserAppState'
import { BaseRepository } from './BaseRepository'
import { IUserAccountRepository } from './interfaces/IUserAccountRepository'

console.log('registering data models')
require('server/models/UserAccountModel')

export class UserAccountRepository extends BaseRepository<UserAccount> implements IUserAccountRepository {
  constructor() {
    super('UserAccount')
  }

  public async findUserAccountByEmail(email: string): Promise<UserAccount | undefined> {
    try {
      return await this._model.findOne({ email: email })
    } catch (e) {
      console.log("Couldn't find user account by email", email)
      console.error(e)
    }
  }

  public async findUserAccountByAddress(address: string): Promise<UserAccount | undefined> {
    try {
      return await this._model.findOne({ addresses: address })
    } catch (e) {
      console.log("Couldn't find user account by address", address)
      console.error(e)
    }
  }

  public async saveAppState(address: string, state: UserAppState): Promise<void>  {
    try {
      return await this._model.saveClientState({ addresses: address })
    } catch (e) {
      console.log("Couldn't find user account by address", address)
      console.error(e)
    }
  }
}
