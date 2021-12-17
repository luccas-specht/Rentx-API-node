import { Request, Response } from 'express'

import { ListCategoriesUseCase } from './ListCategoriesUseCase'

export class ListCategoriesController {
  constructor(private categoriesUseCase: ListCategoriesUseCase) {}

  handle(request: Request, response: Response): Response {
    // useCase here, useCase => Service
    const allCategories = this.categoriesUseCase.execute()

    return response.json(allCategories)
  }
}
