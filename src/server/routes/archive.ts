import { Router } from 'express'
import { ArchiveController } from '../controllers/ArchiveController'

export const register = (router: Router) => {
  const controller = new ArchiveController()

  router.get('/archive/search', controller.Search.bind(controller))
}
