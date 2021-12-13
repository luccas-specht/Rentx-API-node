import { Router } from 'express'

import { Category } from '../models'

export const categoriesRoutes = Router()

const categories: Category[] = []

categoriesRoutes.post('/', (request, response) => {
  const {
    body: { name, description },
  } = request

  const category = new Category()

  Object.assign(category, {
    name,
    description,
    created_at: new Date(),
  })

  categories.push(category)

  // sempre que eniviarmos um status sem um .json() devemos chamar o metodo .send() para enviar essa resposta com o status escolhido.
  return response.status(201).send()
})
