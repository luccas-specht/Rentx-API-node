import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateCarUseCase } from './CreateCarUseCase'

export class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      brand,
      daily_rate,
      category_id,
      description,
      fine_amount,
      license_plate,
    } = request.body

    const createCarUseCase = container.resolve(CreateCarUseCase)
    const car = await createCarUseCase.execute({
      name,
      brand,
      daily_rate,
      category_id,
      description,
      fine_amount,
      license_plate,
    })

    return response.status(201).json(car)
  }
}
