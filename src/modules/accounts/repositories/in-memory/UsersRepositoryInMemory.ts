import { ICreateUserDTO } from '@modules/accounts/dtos'
import { Users } from '@modules/accounts/infra'

import { IUsersRepository } from '..'

export class UsersRepositoryInMemory implements IUsersRepository {
  users: Users[] = []

  async create(data: ICreateUserDTO): Promise<void> {
    const { name, driver_license, email, password } = data
    const user = new Users()

    Object.assign(user, {
      name,
      email,
      driver_license,
      password,
    })

    this.users.push(user)
  }

  async findById(id: string): Promise<Users> {
    return this.users.find((user) => user.id === id)
  }

  async findByEmail(email: string): Promise<Users> {
    return this.users.find((user) => user.email === email)
  }

  updateUser(user: Users): Promise<Users> {
    throw new Error('Method not implemented.')
  }
}
