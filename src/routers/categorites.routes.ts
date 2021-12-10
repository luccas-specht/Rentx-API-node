import { Router } from 'express'

export const categoriesRoutes = Router()

const categories = []

categoriesRoutes.post('/categories', (request, response) => {
  const {
    body: { name, description },
  } = request

  categories.push({
    name,
    description,
  })

  // sempre que eniviarmos um status sem um .json() devemos chamar o metodo .send() para enviar essa resposta com o status escolhido.
  return response.status(201).send()
})
