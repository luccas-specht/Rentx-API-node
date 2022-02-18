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

    this.cars.push(car)
    return car
  }

  async findAllAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    return this.cars.filter((car) => {
      if (car.available) {
        if (
          (brand && car.brand === brand) ||
          (name && car.name === name) ||
          (category_id && car.id === category_id)
        ) {
          return car
        }
        return car
      }
      return null
    })
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id)
  }
}
