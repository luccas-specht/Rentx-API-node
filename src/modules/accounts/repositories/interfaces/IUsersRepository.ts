import { ICreateUserDTO } from '../../dtos'

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>
}
