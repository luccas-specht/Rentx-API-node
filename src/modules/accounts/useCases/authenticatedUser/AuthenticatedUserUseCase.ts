import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject } from 'tsyringe'

import { IUsersRepository } from '../../repositories'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
}

export class AuthenticatedUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new Error('Email or password incorrect')

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) throw new Error('Email or password incorrect')

    const token = sign({}, '612a26645a36b066ad41322cc95aa0fb', {
      subject: user.id,
      expiresIn: '1d',
    })

    return {
      user,
      token,
    }
  }
}
