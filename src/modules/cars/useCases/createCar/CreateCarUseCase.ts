import { ICarsRepository } from '@modules/cars/repositories'
import { inject, injectable } from 'tsyringe'

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
    private readonly carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    brand,
    daily_rate,
    category_id,
    description,
    fine_amount,
    license_plate,
  }: IRequest): Promise<void> {
    await this.carsRepository.create({
      name,
      brand,
      daily_rate,
      category_id,
      description,
      fine_amount,
      license_plate,
    })
  }
}
