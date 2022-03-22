import { UserAccount } from 'types/UserAccount'
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
      const item = await this._model.findOne({ email: email })
      if (item) {
        return {
          ...item,
          appState: JSON.parse(item.rawAppState)
        }
      }
    } catch (e) {
      console.log("Couldn't find user account by email", email)
      console.error(e)
    }
  }

  public async findUserAccountByAddress(address: string): Promise<UserAccount | undefined> {
    try {
      const item =  await this._model.findOne({ addresses: address })
      if (item) {
        return {
          ...item,
          appState: JSON.parse(item.rawAppState)
        }
      }
    } catch (e) {
      console.log("Couldn't find user account by address", address)
      console.error(e)
    }
  }

  public async create(item: UserAccount): Promise<UserAccount | undefined> {
    return super.create({
      ...item,
      rawAppState: JSON.stringify(item.appState)
    })
  }

  public async findOne(id: string): Promise<UserAccount | undefined> {
    const item = await this._model.findOne({ _id: id }).lean()
    if (item) {
      return {
        ...item,
        appState: JSON.parse(item.rawAppState)
      }
    }
  }

  public async update(id: string, item: UserAccount): Promise<UserAccount | undefined> {
    return super.update(id, {
      ...item,
      rawAppState: JSON.stringify(item.appState)
    })
  }
}
