import { Request, Response } from 'express'

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

export class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  handle(request: Request, response: Response): Response {
    const {
      body: { name, description },
    } = request

    this.createSpecificationUseCase.execute({ name, description })

    return response.status(201).send()
  }
}
