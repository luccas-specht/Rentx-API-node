import { Car } from '@modules/cars/infra'
import { ICreateCarDTO } from '@modules/cars/dtos'

import { ICarsRepository } from '..'

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate)
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    })

    return car
  }
}
