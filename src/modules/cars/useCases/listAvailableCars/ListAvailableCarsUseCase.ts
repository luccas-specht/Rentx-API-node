import { Car } from '@modules/cars/infra'
import { ICarsRepository } from '@modules/cars/repositories'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  name?: string
  brand?: string
  category_id?: string
}

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ name, brand, category_id }: IRequest): Promise<Car[]> {
    return this.carsRepository.findAllAvailable(brand, category_id, name)
  }
}
