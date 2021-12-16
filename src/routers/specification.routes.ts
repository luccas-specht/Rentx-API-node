import { Router } from 'express'

import { createSpecificationConttroller } from '../modules/cars/useCases/createSpecification'
import { listSpecificationsController } from  '../modules/cars/useCases/listSpecifications'

export const specificationRoutes = Router()

specificationRoutes.post('/', (request, response) => 
  createSpecificationConttroller.handle(request, response)
)

specificationRoutes.get('/', (request, response) => 
  listSpecificationsController.handle(request, response)
)
