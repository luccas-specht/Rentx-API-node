import { ICreateCarDTO } from '@modules/cars/dtos'

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<void>
}
