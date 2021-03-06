import { ICreateRentalDTO } from '@modules/rentals/dtos'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'

export interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>
  findOpenRentalByCar(car_id: string): Promise<Rental>
  findOpenRentalByUser(user_id: string): Promise<Rental>
}
