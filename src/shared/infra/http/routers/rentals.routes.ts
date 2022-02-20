import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController'
import { Router } from 'express'

import { ensureAuthenticated } from '..'

export const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle)
