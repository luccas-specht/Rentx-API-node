import { ICreateCarDTO } from '@modules/cars/dtos'
import { ICarsRepository } from '@modules/cars/repositories'
import { getRepository } from 'typeorm'

import { Car } from '../entities'

export class CarsRepository implements ICarsRepository {
  constructor(private readonly repository = getRepository(Car)) {}

  async create({
    brand,
    category_id,
    description,
    fine_amount,
    license_plate,
    name,
    daily_rate,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      description,
      fine_amount,
      license_plate,
      name,
      daily_rate,
    })
    await this.repository.save(car)
    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.findOne({ license_plate })
  }

  async findAllAvailable(): Promise<Car[]> {
    return this.repository.find({ available: true })
  }
}
