import { Request, Response, NextFunction } from 'express'
import moment from 'moment'
import passport from 'passport'
import { UserAccount } from 'src/types/UserAccount'
import VerificationTokenModel from '../models/VerificationTokenModel'
import UserAccountModel from '../models/UserAccountModel'
import { IVerificationTokenRepository } from '../repositories/interfaces/IVerificationTokenRepository'
import { IUserAccountRepository } from '../repositories/interfaces/IUserAccountRepository'
import { EmailService } from '../services/email-service'
import { isValidSignature } from '../strategies/web3'

export class UserController {
  private _repository: IUserAccountRepository
  private _tokenRepository: IVerificationTokenRepository

  constructor(repository: IUserAccountRepository, tokenRepository: IVerificationTokenRepository) {
    this._repository = repository
    this._tokenRepository = tokenRepository
  }

  public async GetToken(req: Request, res: Response) {
    const identifier: string = req.body?.identifier
    if (!identifier) {
      return res.status(400).send({ code: 400, message: 'Identifier not provided.' })
    }

    try {
      const isEmail = /\S+@\S+\.\S+/.test(identifier)
      const token = new VerificationTokenModel()
      token.identifier = identifier
      token.nonce = Math.floor(Math.random() * (99999999 - 10000000)) + 10000000
      token.expires = moment(Date.now()).add(20, 'minutes').toDate()
      
      let data = await this._tokenRepository.create(token)
      if (!data) {
        return res.status(500).send({ code: 500, message: 'Unable to login with email account.' })
      }

      if (isEmail) {
        const emailService = new EmailService()      
        await emailService.sendMail(identifier, 'default-email', `${token.nonce} is your Devcon verification code`, {
          TITLE: 'Confirm your email address',
          DESCRIPTION: `Please enter this verification code on Devcon.org\n

          ${token.nonce}\n
           
          This verification codes expires in 20 minutes.`
        })

        data.nonce = -1 // only share nonce via email
      }
      
      req.session.tokenId = data?._id
      res.status(200).send({ code: 200, message: '', data: data })
    } catch (e) {
      console.error(e)
      res.status(500).send({ code: 500, message: 'Unable to generate security nonce.' })
    }
  }

  public async LoginWeb3(req: Request, res: Response, next: NextFunction) {
    const id: string = req.session.tokenId
    if (!id) {
      return res.status(400).send({ code: 400, message: 'No session token.' })
    }
    
    const address: string = req.body.address
    const nonce: number = req.body.nonce
    const msg: string = req.body.msg
    const signed: string = req.body.signed
    if (!address || !nonce || !msg || !signed) {
      return res.status(400).send({ code: 400, message: 'Invalid input.' })
    }

    const data = await this._tokenRepository.findValidVerificationToken(address, nonce)
    if (!data) {
      return res.status(400).send({ code: 400, message: 'No valid verification token found.' })
    }

    const userId = req.session.userId
    if (userId) {
      let userAccount = await this._repository.findUserAccountByAddress(address)
      if (userAccount) {
        return res.status(400).send({ code: 400, message: 'Unable to add wallet address.' }) // TODO: wallet address already exists
      }

      userAccount = await this._repository.findOne(userId)
      if (!userAccount) {
        return res.status(400).send({ code: 400, message: 'Invalid session.' })
      }

      const validSignature = isValidSignature(address, msg, signed)
      if (!validSignature) {
        return res.status(400).send({ code: 400, message: 'Invalid signature.' })
      }

      userAccount = {...userAccount, addresses: [...userAccount.addresses, address] }
      const updated = await this._repository.update(userId, userAccount)
      if (updated) {
        return res.status(200).send({ code: 204, message: '', data: userAccount })
      }
      
      return res.status(500).send({ code: 500, message: 'Unable to add email address.' })
    }

    passport.authenticate('web3', (error, user, info) => {
      if (error || !user) {
        return res.status(400).send({ code: 400, message: info.message || `Bad request` })        
      } else {
        req.logIn(user, function (err) {
          if (err) {
            return next(err)
          }

          req.session.userId = user._id
          let returnObj = JSON.parse(JSON.stringify(user)) as UserAccount
          returnObj.activeAddress = address
          return res.status(200).send({ code: 200, message: '', data: returnObj })
        })
      }
    })(req, res, next)
  }

  public async LoginEmail(req: Request, res: Response, next: NextFunction) {
    const id: string = req.session.tokenId
    if (!id) {
      return res.status(400).send({ code: 400, message: 'No session token.' })
    }

    const address: string = req.body.address
    const nonce: number = req.body.nonce
    if (!address || !nonce) {
      return res.status(400).send({ code: 400, message: 'Invalid input.' })
    }

    const data = await this._tokenRepository.findValidVerificationToken(address, nonce)
    if (!data) {
      return res.status(400).send({ code: 400, message: 'No valid verification token found.' })
    }

    const userId = req.session.userId
    if (userId) {
      let userAccount = await this._repository.findUserAccountByEmail(address)
      if (userAccount) {
        return res.status(400).send({ code: 400, message: 'Unable to add email address.' }) // TODO: email address already exists
      }

      userAccount = await this._repository.findOne(userId)
      if (!userAccount) {
        return res.status(400).send({ code: 400, message: 'Invalid session.' })
      }

      userAccount = {...userAccount, email: address }
      const updated = await this._repository.update(userId, userAccount)
      if (updated) {
        return res.status(200).send({ code: 204, message: '', data: userAccount })
      }
      
      return res.status(500).send({ code: 500, message: 'Unable to add email address.' })
    }

    let userAccount = await this._repository.findUserAccountByEmail(address)
    if (!userAccount) {
      const model = new UserAccountModel()
      model.email = address
      userAccount = await this._repository.create(model)
    }
    if (!userAccount) {
      return res.status(500).send({ code: 500, message: 'Unable to login with email account.' })
    }

    req.logIn(userAccount, function (err) {
      if (err) {
        return next(err)
      }
      
      req.session.userId = userAccount?._id
      return res.status(200).send({ code: 200, message: '', data: userAccount })
    })
  }

  public async Logout(req: Request, res: Response) {
    try {
      if (req.session) {
        req.session.destroy(err => {
          if (err) {
            console.error('Unable to destroy session', err)
          }
        })
      }
      req.logout()
      res.status(200).send({ code: 200, message: 'Logout successful' })
    } catch (e) {
      console.error(e)
      res.status(500).send({ code: 500, message: 'Unable to verify email.' })
    }
  }

  public async GetAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this._repository.findOne(req.user._id)

      res.status(200).send({ code: 200, message: '', data: data })
    } catch (e) {
      console.error(e)
      res.status(500).send({ code: 500, message: 'Unable to get user account.' })
    }
  }

  public async UpdateAccount(req: Request, res: Response) {
    try {
      const paramId: string = JSON.stringify(req.params.id)
      const userId: string = JSON.stringify(req.user._id)
      const account = req.body?.account as UserAccount

      if (!account) {
        return res.status(400).send({ code: 400, message: 'User account not provided.' })
      }

      if (paramId !== userId) {
        return res.status(405).send({ code: 405, message: 'Not allowed to update user account.' })
      }

      if (paramId === userId) {
        const updated = await this._repository.update(req.params.id, account)
        if (updated) {
          return res.status(204).send({ code: 204, message: 'OK' })
        }

        return res.status(404).send({ code: 404, message: 'User account not updated.' })
      }
    } catch (e) {
      console.error(e)
    }

    res.status(500).send({ code: 500, message: 'Unable to update user account.' })
  }

  public async DeleteAccount(req: Request, res: Response) {
    try {
      const paramId: string = JSON.stringify(req.params.id)
      const userId: string = JSON.stringify(req.user._id)

      if (paramId !== userId) {
        return res.status(405).send({ code: 405, message: 'Not allowed to delete user account.' })
      }

      if (paramId === userId) {
        const deleted = await this._repository.delete(req.params.id)
        if (deleted) {
          if (req.session) {
            req.session.destroy(err => {
              if (err) {
                console.error('Unable to destroy session', err)
              }
            })
          }
          req.logout()
          return res.status(200).send({ code: 200, message: 'OK' })
        }

        return res.status(404).send({ code: 404, message: 'User account not found.' })
      }
    } catch (e) {
      console.error(e)
    }

    res.status(500).send({ code: 500, message: 'Unable to delete user account.' })
  }
}
