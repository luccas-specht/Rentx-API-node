import { ICarsRepository } from '@modules/cars/repositories'

import { AppError } from '@shared/errors'

interface IRequest {
  car_id: string
  specifications_id: string[]
}

export class CreateCarSpecificationUseCase {
  constructor(private carsReposiory: ICarsRepository) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const carExists = await this.carsReposiory.findById(car_id)

    if (!carExists) throw new AppError('Car does not exists')
  }
}
