import { Car } from '@modules/cars/infra'
import { ICarsRepository } from '@modules/cars/repositories'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors'

interface IRequest {
  name: string
  brand: string
  description: string
  daily_rate: number
  license_plate: string
  fine_amount: number
  category_id: string
}

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  private async checkIfCarAlreadyExists(license_plate: string): Promise<void> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    )
    if (carAlreadyExists) throw new AppError('Car already exists')
  }

  async execute({
    name,
    brand,
    daily_rate,
    category_id,
    description,
    fine_amount,
    license_plate,
  }: IRequest): Promise<Car> {
    await this.checkIfCarAlreadyExists(license_plate)
    const car = await this.carsRepository.create({
      name,
      brand,
      daily_rate,
      category_id,
      description,
      fine_amount,
      license_plate,
    })

    return car
  }
}
