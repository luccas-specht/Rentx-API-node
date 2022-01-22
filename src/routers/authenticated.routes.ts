import { AuthenticatedUserController } from '@modules/accounts/useCases/authenticatedUser'
import { Router } from 'express'

const authenticatedUserController = new AuthenticatedUserController()

export const authenticatedRoutes = Router()

authenticatedRoutes.post('/', authenticatedUserController.handle)
