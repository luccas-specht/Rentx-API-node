import { Router } from 'express'

import { authenticatedRoutes } from './authenticated.routes'
import { categoriesRoutes } from './categories.routes'
import { specificationRoutes } from './specification.routes'
import { usersRoutes } from './users.routes'

export const routers = Router()

routers.use('/users', usersRoutes)
routers.use('/categories', categoriesRoutes)
routers.use('/specifications', specificationRoutes)
routers.use('/sessions', authenticatedRoutes)
