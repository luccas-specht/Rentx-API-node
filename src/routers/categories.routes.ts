import { Router } from 'express'

import { CategoriesRepository } from '../repositories'
import { CreateCategoryService, ListCategoriesServices } from '../services'

export const categoriesRoutes = Router()

const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', (request, response) => {
  const {
    body: { name, description },
  } = request

  const createCategoryService = new CreateCategoryService(categoriesRepository)
  createCategoryService.execute({ name, description })

  // sempre que eniviarmos um status sem um .json() devemos chamar o metodo .send() para enviar essa resposta com o status escolhido.
  return response.status(201).send()
})

categoriesRoutes.get('/', (request, response) => {
  const listCategoriesService = new ListCategoriesServices(categoriesRepository)
  const categories = listCategoriesService.execute()

  return response.json(categories)
})
