import { Router } from 'express'
import { v4 as uuidV4 } from 'uuid'

export const categoriesRoutes = Router()

const categories = []

categoriesRoutes.post('/', (request, response) => {
  const {
    body: { name, description },
  } = request

  const category = {
    ui: uuidV4(),
    name,
    description,
    created_at: new Date(),
  }

  categories.push(category)

  // sempre que eniviarmos um status sem um .json() devemos chamar o metodo .send() para enviar essa resposta com o status escolhido.
  return response.status(201).send()
})
