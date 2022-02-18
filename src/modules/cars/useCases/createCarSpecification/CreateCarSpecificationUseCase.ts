import { Car } from '@modules/cars/infra'
import {
  ICarsRepository,
  ISpecificationRepository,
} from '@modules/cars/repositories'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors'

interface IRequest {
  car_id: string
  specifications_id: string[]
}

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('SpecificationRepository')
    private specificationsRepository: ISpecificationRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(car_id)
    if (!car) throw new AppError('Car does not exists')

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    )
    car.specifications = specifications

    await this.carsRepository.create(car)

    return car
  }
}
