import { Router } from 'express'

import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController'
import { ListSpecificationsController } from '../modules/cars/useCases/listSpecifications/ListSpecificationsController'

export const specificationRoutes = Router()

const listSpecificationsController = new ListSpecificationsController()
const createSpecificationConttroller = new CreateSpecificationController()

specificationRoutes.get('/', listSpecificationsController.handle)
specificationRoutes.post('/', createSpecificationConttroller.handle)
