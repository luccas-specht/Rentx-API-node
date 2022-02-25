import { ICarsRepository } from '@modules/cars/repositories'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories'
import { inject } from 'tsyringe'

import { IDateProvider } from '@shared/container/providers/DateProvider/interfaces'
import { AppError } from '@shared/errors'

interface IRequest {
  id: string
  user_id: string
}

interface IValueDailies {
  delay: number
  fineAmount: number
}

interface ITotalRentalDailies extends IValueDailies {
  daily: number
  carDailyRate: number
}

export class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DayJsDateProvider')
    private dayJsDateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const MINIMUM_DAILY = 1
    const rental = await this.rentalsRepository.findById(id)
    const car = await this.carsRepository.findById(id)

    if (!rental) throw new AppError('Rental does not exist')

    const dateNow = this.dayJsDateProvider.dateNow()

    let daily = this.dayJsDateProvider.compareInDays(rental.start_date, dateNow)

    if (daily <= 0) daily = MINIMUM_DAILY

    const delay = this.dayJsDateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    )

    const totalRental = this.calculateTotalRental({
      daily,
      delay,
      fineAmount: car.fine_amount,
      carDailyRate: car.daily_rate,
    })

    rental.end_date = this.dayJsDateProvider.dateNow()
    rental.total = totalRental

    await this.rentalsRepository.create(rental)
    await this.carsRepository.updateAvailable(car.id, true)

    return rental
  }

  private calculateTotalRental({
    daily,
    delay,
    fineAmount,
    carDailyRate,
  }: ITotalRentalDailies): number {
    let total = 0
    if (delay > 0) total = this.calculateValueDailies({ delay, fineAmount })

    total += daily * carDailyRate
    return total
  }

  private calculateValueDailies({ delay, fineAmount }: IValueDailies): number {
    const calculate_fine = delay * fineAmount
    return calculate_fine
  }
}
