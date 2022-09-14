import { GetSessions } from 'services/programming'
import { Session } from 'types/Session'
import { UserAccount } from 'types/UserAccount'
import { BaseRepository } from './BaseRepository'
import { IUserAccountRepository } from './interfaces/IUserAccountRepository'

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

  public async findPersonalizedAgenda(userId: string): Promise<Session[]> {
    console.log('Find personalized schedule', userId)
    try {
      console.log('find User')
      const user = await this._model.findOne({ _id: userId }) as UserAccount
      if (!user.appState.publicSchedule) return []

      console.log('Get Sessions')
      const sessions = await GetSessions()

      console.log('Filter')
      const filtered = sessions.filter(i => user.appState.sessions.map(x => x.id).includes(i.id))

      console.log('Return', filtered.length)
      return filtered
    } catch (e) {
      console.log("Couldn't find user account", userId)
      console.error(e)
    }

    return []
  }
}
