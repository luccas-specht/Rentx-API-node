import { Router, Request, Response, NextFunction } from 'express'

import { CategoriesRepository } from '../repositories/categories.repository'

export const categoriesRoutes = Router()

const categoriesRepository = new CategoriesRepository()

function checkIfCategoryNameAlreadyisInUse(
  request: Request,
  response: Response,
  nextFunction: NextFunction
) {
  const {
    body: { name },
  } = request

  const categoryAlreadyExists =
    categoriesRepository.checkIfCategoryNameIsUnique(name)

  if (categoryAlreadyExists)
    return response
      .status(400)
      .json({ messageError: 'category already exists' })

  return nextFunction()
}

categoriesRoutes.post(
  '/',
  checkIfCategoryNameAlreadyisInUse,
  (request, response) => {
    const {
      body: { name, description },
    } = request

    categoriesRepository.create({ name, description })

    // sempre que eniviarmos um status sem um .json() devemos chamar o metodo .send() para enviar essa resposta com o status escolhido.
    return response.status(201).send()
  }
)

categoriesRoutes.get('/', (request, response) => {
  const categories = categoriesRepository.list()

  return response.json(categories)
})
