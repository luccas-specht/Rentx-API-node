import { Router } from 'express'

import { ensureAuthenticated } from '../middlewares'
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController'
import { ListSpecificationsController } from '../modules/cars/useCases/listSpecifications/ListSpecificationsController'

export const specificationRoutes = Router()

const listSpecificationsController = new ListSpecificationsController()
const createSpecificationConttroller = new CreateSpecificationController()

specificationRoutes.use(ensureAuthenticated)
specificationRoutes.get('/', listSpecificationsController.handle)
specificationRoutes.post('/', createSpecificationConttroller.handle)
