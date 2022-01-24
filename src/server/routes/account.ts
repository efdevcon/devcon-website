import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { VerificationTokenRepository } from '../repositories/VerificationTokenRepository'
import { UserAccountRepository } from '../repositories/UserAccountRepository'
import { isAuthenticated } from '../strategies/web3'

// Register data model
console.log('registering data models')
require('../models/UserAccountModel')
require('../models/VerificationTokenModel')

export const register = (router: Router) => {
  const repo = new UserAccountRepository()
  const tokenRepo = new VerificationTokenRepository()
  const controller = new UserController(repo, tokenRepo)

  router.post('/account/token', controller.GetToken.bind(controller))
  router.post('/account/login/web3', controller.LoginWeb3.bind(controller))
  router.post('/account/login/email', controller.LoginEmail.bind(controller))
  router.post('/account/logout', isAuthenticated, controller.Logout.bind(controller))
  router.get('/account', isAuthenticated, controller.GetAccount.bind(controller))
  router.put('/account/:id', isAuthenticated, controller.UpdateAccount.bind(controller))
  router.delete('/account/:id', isAuthenticated, controller.DeleteAccount.bind(controller))
}
