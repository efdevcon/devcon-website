import { Router } from 'express'
import { NotificationController } from '../controllers/NotificationController'
import { NotificationRepository } from '../repositories/NotificationRepository'
import { UserAccountRepository } from '../repositories/UserAccountRepository'
// import { isAuthenticated } from '../strategies/web3'

// Register data model
require('../models/NotificationModel')
require('../models/UserAccountModel')

export const register = (router: Router) => {
  const controller = new NotificationController(new NotificationRepository(), new UserAccountRepository());

  router.post('/pwa/push_subscription', /*isAuthenticated, */(req, res, next) => { req.user = 'test1234'; next(); }, controller.createSubscription)
  router.post('/pwa/notification', /*isAuthenticated, */(req, res, next) => { req.user = 'test1234'; next(); }, controller.createNotification)
  router.get('/pwa/vapid', (req, res) => res.status(200).send(process.env.VAPID_PUBLIC));
  router.get('/pwa/heartbeat', (req, res) => res.status(200).send('API WORKS'))
}
