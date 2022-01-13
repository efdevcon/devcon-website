import { Request, Response, NextFunction } from 'express'
import moment from 'moment'
import passport from 'passport'
import { UserAccount } from 'src/types/UserAccount'
import UserAccountModel from '../models/UserAccountModel'
import { IUserAccountRepository } from '../repositories/interfaces/IUserAccountRepository'
import { EmailService } from '../services/email-service'
import emailTemplates from '../services/email-templates.json'

export class UserController {
  private _repository: IUserAccountRepository

  constructor(repository: IUserAccountRepository) {
    this._repository = repository
  }

  public async GetNonce(req: Request, res: Response) {
    try {
      const data = Math.floor(Math.random() * (999999 - 100000)) + 100000

      req.session.nonce = data
      res.status(200).send({ code: 200, message: 'OK', data: data })
    } catch (e) {
      console.error(e)
      res.status(500).send({ code: 500, message: 'Unable to generate security nonce.' })
    }
  }

  public async LoginWeb3(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('web3', (error, user, info) => {
      if (error || !user) {
        return res.status(400).send({ code: 400, message: info.message || `Bad request` })        
      } else {
        req.logIn(user, function (err) {
          if (err) {
            return next(err)
          }
          return res.status(200).send({ code: 200, message: '', data: user })
        })
      }
    })(req, res, next)
  }

  public async LoginEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.body?.email
      if (!email) {
        return res.status(400).send({ code: 400, message: 'Email login input not provided.' })
      }

      if (email) {
        const nonce = Math.floor(Math.random() * (999999 - 100000)) + 100000
        const expirationDate = moment(Date.now()).add(20, 'minutes').toDate()

        let userAccount = await this._repository.findUserAccountByEmail(email)
        if (userAccount) {
          userAccount.nonce = nonce
          userAccount.expires = expirationDate
          await this._repository.update(userAccount._id, userAccount)
        }
        if (!userAccount) {
          const model = new UserAccountModel()
          model.email = email
          model.nonce = nonce
          model.expires = expirationDate
          userAccount = await this._repository.create(model)
        }
        if (!userAccount) {
          return res.status(404).send({ code: 404, message: 'Unable to access email account.' })
        }

        const emailService = new EmailService()      
        await emailService.sendMail(email, 'default-email', `${nonce} is your Devcon verification code`, {
          TITLE: 'Confirm your email address',
          DESCRIPTION: `Please enter this verification code on Devcon.org\n

          ${nonce}\n
           
          This verification codes expires in 20 minutes.`
        })

        return res.status(200).send({ code: 200, message: 'Verification email sent.' })
      }
    } catch (e) {
      console.error(e)
      res.status(500).send({ code: 500, message: `Couldn't update profile` })
    }
  }

  public async VerifyEmail(req: Request, res: Response, next: NextFunction) {
    const email = req.body?.email
    const code = req.body?.code
    
    if (!email || !code) {
      return res.status(400).send({ code: 400, message: 'Email or verification code is incorrect.' })
    }

    const userAccount = await this._repository.findUserAccountByEmail(email)
    if (!userAccount || userAccount.nonce !== code || userAccount.expires < new Date()) {
      return res.status(400).send({ code: 400, message: 'Unable to verify your email address.' })
    }

    req.logIn(userAccount, function (err) {
      if (err) {
        return next(err)
      }

      return res.status(200).send({ code: 200, message: 'Email verified', data: userAccount })
    })
  }

  public async Logout(req: Request, res: Response) {
    try {
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
      const paramId = req.params.id
      const userId = req.user._id
      const account = req.body?.account as UserAccount

      if (!account) {
        return res.status(400).send({ code: 400, message: 'User account not provided.' })
      }

      if (paramId !== userId) {
        return res.status(405).send({ code: 405, message: 'Not allowed to update user account.' })
      }

      if (paramId === userId) {
        const updated = await this._repository.update(paramId, account)
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
      const paramId = req.params.id
      const userId = req.user._id

      if (paramId !== userId) {
        return res.status(405).send({ code: 405, message: 'Not allowed to delete user account.' })
      }

      if (paramId === userId) {
        const deleted = await this._repository.delete(req.params.id)
        if (deleted) {
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
