import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateUserAvatarUseCase } from '.'

export class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      user: { id },
      file: { filename },
    } = request

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)
    await updateUserAvatarUseCase.execute({
      user_id: id,
      avatar_file: filename,
    })

    return response.status(204).send()
  }
}
