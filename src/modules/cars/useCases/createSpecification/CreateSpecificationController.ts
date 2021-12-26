import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

export class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      body: { name, description },
    } = request

    const createCategoryUseCase = container.resolve(CreateSpecificationUseCase)
    await createCategoryUseCase.execute({ name, description })

    return response.status(201).send()
  }
}
