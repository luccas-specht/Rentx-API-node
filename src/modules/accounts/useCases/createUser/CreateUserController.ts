import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      body: { name, email, password, driver_license },
    } = request

    const createUserUseCase = container.resolve(CreateUserUseCase)
    await createUserUseCase.execute({
      name,
      email,
      password,
      driver_license,
    })

    return response.status(201).send()
  }
}
