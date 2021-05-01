import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserAccountRepository } from '../repositories/UserAccountRepository';
import { isAuthenticated } from '../strategies/web3';

// Register data model
require('../models/UserAccountModel')

export const register = (router: Router) => {
  const repo = new UserAccountRepository();
  const controller = new UserController(repo);

  router.get('/users/nonce', controller.Nonce.bind(controller));
  router.post('/users/login', controller.Login.bind(controller));
  router.post('/users/logout', controller.Logout.bind(controller));
  router.get('/users/profile', isAuthenticated, controller.Profile.bind(controller));
};
