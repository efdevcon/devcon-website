import { GetSessions } from 'services/programming'
import { UserAccount, UserSchedule } from 'types/UserAccount'
import { getRandomUsername, getUsername } from 'utils/account'
import dbConnect from 'utils/dbConnect'
import { getDefaultProvider } from 'utils/web3'
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

  public async findPersonalizedAgenda(userId: string): Promise<UserSchedule | undefined> {
    console.log('Find personalized schedule', userId)

    await dbConnect()

    try {
      const user = await this._model.findOne({ _id: userId }) as UserAccount
      if (!user) return

      const username = getUsername(user)
      const provider = getDefaultProvider()
      const name = await provider.lookupAddress(username)
      const sessions = await GetSessions()

      return {
        userId: String(user._id),
        username: user.username ?? name ?? getRandomUsername(String(user._id)),
        publicSchedule: user.appState.publicSchedule,
        sessions: sessions.filter(i => user.appState.sessions.map(x => x.id).includes(i.id))
      }
    } catch (e) {
      console.log("Couldn't find user account", userId)
      console.error(e)
    }

    return
  }
}
