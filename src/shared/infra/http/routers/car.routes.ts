import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { Router } from 'express'

import { ensureAdmin, ensureAuthenticated } from '@shared/infra/'

export const carsRoutes = Router()
const createCarController = new CreateCarController()

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
)
