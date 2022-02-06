import { ICreateCarDTO } from '@modules/cars/dtos'
import { Car } from '@modules/cars/infra'

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>
  findByLicensePlate(license_plate: string): Promise<Car | undefined>
}
