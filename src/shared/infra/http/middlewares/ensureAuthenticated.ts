import { UsersRepository } from '@modules/accounts/infra'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { AppError } from '@shared/errors/AppError'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  nextFunction: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization

  if (!authHeader) throw new AppError('Token missing', 401)

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(
      token,
      '612a26645a36b066ad41322cc95aa0fb'
    ) as IPayload

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(user_id)

    if (!user) throw new AppError('user does not exists', 401)

    request.user = {
      id: user_id,
    }

    nextFunction()
  } catch (error) {
    throw new AppError('Invalid Token', 401)
  }
}
