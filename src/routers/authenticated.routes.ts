import { Router } from 'express'

import { AuthenticatedUserController } from '../modules/accounts/useCases/authenticatedUser'

const authenticatedUserController = new AuthenticatedUserController()

export const authenticatedRoutes = Router()

authenticatedRoutes.post('/sessions', authenticatedUserController.handle)
