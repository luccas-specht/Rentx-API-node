import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { AppError } from '@shared/errors/AppError'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization

  if (!authHeader) throw new AppError('Token missing', 401)

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(
      token,
      '612a26645a36b066ad41322cc95aa0fb'
    ) as IPayload

    request.user = {
      id: user_id,
    }

    next()
  } catch {
    throw new AppError('Invalid Token', 401)
  }
}
