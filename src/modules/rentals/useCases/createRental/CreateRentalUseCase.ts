import { IRentalsRepository } from '@modules/rentals/repositories'

import { AppError } from '@shared/errors'

interface IRequest {
  car_id: string
  user_id: string
  expected_return_date: Date
}

export class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<void> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    )
    if (carUnavailable) throw new AppError('Car is unavailable')

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    )

    if (rentalOpenToUser)
      throw new AppError('there is a rental in progress for user!')
  }
}
