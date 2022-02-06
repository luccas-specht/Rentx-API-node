import { Router } from 'express'

import { authenticatedRoutes } from './authenticated.routes'
import { carsRoutes } from './car.routes'
import { categoriesRoutes } from './categories.routes'
import { specificationRoutes } from './specification.routes'
import { usersRoutes } from './users.routes'

export const routers = Router()

routers.use('/cars', carsRoutes)
routers.use('/users', usersRoutes)
routers.use('/sessions', authenticatedRoutes)
routers.use('/categories', categoriesRoutes)
routers.use('/specifications', specificationRoutes)
