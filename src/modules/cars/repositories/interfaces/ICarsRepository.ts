import { ICreateCarDTO } from '@modules/cars/dtos'
import { Car } from '@modules/cars/infra'

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>
  findByLicensePlate(license_plate: string): Promise<Car | undefined>
  findAllAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]>
  findById(id: string): Promise<Car | undefined>
}
