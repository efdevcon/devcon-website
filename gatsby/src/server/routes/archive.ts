import { Router } from 'express'
import { SearchIndexClient } from '../services/search-client'
import { ArchiveController } from '../controllers/ArchiveController'

export const register = (router: Router) => {
  const searchClient = new SearchIndexClient()
  const controller = new ArchiveController(searchClient)

  router.get('/archive/search', controller.Search.bind(controller))
}
