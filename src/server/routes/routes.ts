import { Router } from 'express';
import { TestController } from '../controllers/TestService';

export const register = (router: Router) => {
  const controller = new TestController();

  router.get('/hello', controller.Get.bind(controller));
};
