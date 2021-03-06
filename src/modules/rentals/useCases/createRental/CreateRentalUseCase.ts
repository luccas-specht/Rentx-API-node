import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories'
import { inject, injectable } from 'tsyringe'

import { IDateProvider } from '@shared/container/providers/DateProvider/interfaces'
import { AppError } from '@shared/errors'

interface IRequest {
  car_id: string
  user_id: string
  expected_return_date: Date
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('DayJsDateProvider')
    private dayJsDateProvider: IDateProvider,
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const compareHours = 24

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    )
    if (carUnavailable) throw new AppError('Car is unavailable')

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    )

    if (rentalOpenToUser)
      throw new AppError('there is a rental in progress for user!')

    const dateNow = this.dayJsDateProvider.dateNow()

    const compare = this.dayJsDateProvider.compareInHours(
      dateNow,
      expected_return_date
    )

    if (compare < compareHours) throw new AppError('invalid return time!')

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    })

    return rental
  }
}
