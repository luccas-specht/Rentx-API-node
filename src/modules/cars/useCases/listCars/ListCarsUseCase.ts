import { Car } from '@modules/cars/infra'
import { ICarsRepository } from '@modules/cars/repositories'

interface IRequest {
  name?: string
  brand?: string
  category_id?: string
}

export class ListCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute({ name, brand, category_id }: IRequest): Promise<Car[]> {
    return this.carsRepository.findAllAvailable(brand, category_id, name)
  }
}
