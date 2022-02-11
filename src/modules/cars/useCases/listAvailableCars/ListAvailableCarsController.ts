import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

export class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      query: { name, brand, category_id },
    } = request

    const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase)
    const list = await listAvailableCarsUseCase.execute({
      name: name as string,
      brand: brand as string,
      category_id: category_id as string,
    })

    return response.json(list)
  }
}
