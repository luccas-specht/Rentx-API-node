import { getRepository, Repository } from 'typeorm'

import { ICreateUserDTO } from '../../dtos'
import { Users } from '../../entities'
import { IUsersRepository } from '../interfaces/IUsersRepository'

export class UsersRepository implements IUsersRepository {
  constructor(private repository: Repository<Users> = getRepository(Users)) {}

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
    })

    await this.repository.save(user)
  }
}
