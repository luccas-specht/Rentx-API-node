import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController'
import { ListSpecificationsController } from '@modules/cars/useCases/listSpecifications/ListSpecificationsController'
import { Router } from 'express'

import { ensureAuthenticated } from '@shared/infra/http'

export const specificationRoutes = Router()

const listSpecificationsController = new ListSpecificationsController()
const createSpecificationConttroller = new CreateSpecificationController()

specificationRoutes.use(ensureAuthenticated)
specificationRoutes.get('/', listSpecificationsController.handle)
specificationRoutes.post('/', createSpecificationConttroller.handle)
