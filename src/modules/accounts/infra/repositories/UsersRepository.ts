import { ICreateUserDTO } from '@modules/accounts/dtos'
import { Users } from '@modules/accounts/infra'
import { IUsersRepository } from '@modules/accounts/repositories/interfaces'
import { getRepository, Repository } from 'typeorm'

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

  async findByEmail(email: string): Promise<Users | undefined> {
    return this.repository.findOne({ email })
  }

  async findById(id: string): Promise<Users | undefined> {
    return this.repository.findOne(id)
  }

  async updateUser(user: Users): Promise<Users> {
    return this.repository.save(user)
  }
}
