import { ICreateUserDTO } from '@modules/accounts/dtos'
import { Users } from '@modules/accounts/infra'

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>
  findById(id: string): Promise<Users | undefined>
  findByEmail(email: string): Promise<Users | undefined>
  updateUser(user: Users): Promise<Users>
}
