import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory'

import { AppError } from '@shared/errors'

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory
    )
  })

  it('should benot able to add a new specification to a non-existent car ', () => {
    expect(async () => {
      const car_id = '123'
      const specifications_id = ['4311']

      await createCarSpecificationUseCase.execute({ car_id, specifications_id })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to add a new specification to the car ', async () => {
    const specifications_id = ['4311']
    const { id: car_id } = await carsRepositoryInMemory.create({
      brand: 'brand',
      category_id: 'cate',
      daily_rate: 100,
      description: 'decription',
      fine_amount: 10,
      license_plate: 'AFZ-4318',
      name: 'bmw',
    })

    await createCarSpecificationUseCase.execute({ car_id, specifications_id })
  })
})
