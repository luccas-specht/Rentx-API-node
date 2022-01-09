import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AuthenticatedUserUseCase } from '.'

export class AuthenticatedUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authenticatedUserUseCase = container.resolve(AuthenticatedUserUseCase)
    const authenticatedInfo = await authenticatedUserUseCase.execute({
      email,
      password,
    })

    return response.json(authenticatedInfo)
  }
}
