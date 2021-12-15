import { Router } from 'express'

import { SpecificationRepository } from '../modules/cars/repositories'
import { CreateSpecificationService } from '../modules/cars/services'

export const specificationRoutes = Router()
const specificationsRepository = new SpecificationRepository()

specificationRoutes.post('/', (request, response) => {
  const {
    body: { name, description },
  } = request

  const createSpecificationService = new CreateSpecificationService(
    specificationsRepository
  )
  createSpecificationService.execute({ name, description })

  return response.status(201).send()
})
