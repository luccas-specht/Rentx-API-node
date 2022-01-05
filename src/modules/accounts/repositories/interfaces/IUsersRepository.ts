import { ICreateUserDTO } from '../../dtos'
import { Users } from '../../entities'

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<Users | undefined>
}
