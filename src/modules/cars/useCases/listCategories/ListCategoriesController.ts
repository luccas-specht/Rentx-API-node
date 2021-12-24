import { Request, Response } from 'express'

import { ListCategoriesUseCase } from './ListCategoriesUseCase'

export class ListCategoriesController {
  constructor(private categoriesUseCase: ListCategoriesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const allCategories = await this.categoriesUseCase.execute()

    return response.json(allCategories)
  }
}
