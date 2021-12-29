import { inject, injectable } from 'tsyringe'

import { ICreateUserDTO } from '../../dtos'
import { IUsersRepository } from '../../repositories/interfaces'

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create({
      name,
      email,
      password,
      driver_license,
    })
  }
}