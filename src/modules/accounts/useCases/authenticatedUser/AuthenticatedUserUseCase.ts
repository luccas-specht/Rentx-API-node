import { AppError } from '@errors/AppError'
import { IUsersRepository } from '@modules/accounts/repositories'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

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
@injectable()
export class AuthenticatedUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new AppError('Email or password incorrect', 400)

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) throw new AppError('Email or password incorrect', 400)

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
