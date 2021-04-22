import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { isAuthenticated } from '../strategies/web3';

export const register = (router: Router) => {
  const controller = new UserController();

  router.get('/users/nonce', controller.Nonce.bind(controller));
  router.post('/users/login', controller.Login.bind(controller));
  router.post('/users/logout', controller.Logout.bind(controller));
  router.get('/users/profile', isAuthenticated, controller.Profile.bind(controller));
};
