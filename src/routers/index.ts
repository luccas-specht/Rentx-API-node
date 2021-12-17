import { Router } from 'express'

import { categoriesRoutes } from './categories.routes'
import { specificationRoutes } from './specification.routes'

export const routers = Router()

routers.use('/categories', categoriesRoutes)
routers.use('/specifications', specificationRoutes)