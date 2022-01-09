import { ICreateUserDTO } from '../../dtos'
import { Users } from '../../entities'

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>
  findById(email: string): Promise<Users | undefined>
  findByEmail(email: string): Promise<Users | undefined>
  updateUser(user: Users): Promise<Users>
}
