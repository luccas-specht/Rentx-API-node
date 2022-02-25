import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory'
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory'
import dayjs from 'dayjs'

import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations'
import { AppError } from '@shared/errors'

import { CreateRentalUseCase } from './CreateRentalUseCase'

let dateProvider: DayJsDateProvider
let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate()
  beforeEach(() => {
    dateProvider = new DayJsDateProvider()
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(
      dateProvider,
      rentalsRepositoryInMemory,
      carsRepositoryInMemory
    )
  })

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '123123',
      user_id: '123123',
      expected_return_date: dayAdd24Hours,
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental if there is another open to the same user', () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        car_id: '123123',
        user_id: '123123',
        expected_return_date: dayAdd24Hours,
      })

      await createRentalUseCase.execute({
        car_id: '1223',
        user_id: rental.user_id,
        expected_return_date: dayAdd24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental if there is another open to the same car', () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        car_id: '1981261',
        user_id: '71762',
        expected_return_date: dayAdd24Hours,
      })

      await createRentalUseCase.execute({
        car_id: rental.car_id,
        user_id: '98127617267162',
        expected_return_date: dayAdd24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental with invalid return time', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '51661',
        user_id: '98127617267162',
        expected_return_date: dayjs().toDate(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
