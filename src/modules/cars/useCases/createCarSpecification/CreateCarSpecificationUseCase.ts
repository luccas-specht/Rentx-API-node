import {
  ICarsRepository,
  ISpecificationRepository,
} from '@modules/cars/repositories'

import { AppError } from '@shared/errors'

interface IRequest {
  car_id: string
  specifications_id: string[]
}

export class CreateCarSpecificationUseCase {
  constructor(
    private carsRepository: ICarsRepository,
    private specificationsRepository: ISpecificationRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const car = await this.carsRepository.findById(car_id)
    if (!car) throw new AppError('Car does not exists')

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    )
    car.specifications = specifications

    await this.carsRepository.create(car)
  }
}
