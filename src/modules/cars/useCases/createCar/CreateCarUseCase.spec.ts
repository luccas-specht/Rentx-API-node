import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory'

import { AppError } from '@shared/errors'

import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      brand: 'brand',
      category_id: 'cate',
      daily_rate: 100,
      description: 'decription',
      fine_amount: 10,
      license_plate: 'AFZ-4318',
      name: 'bmw',
    })
    expect(car).toHaveProperty('id')
  })

  it('should not be able to create a new category with same name', () => {
    const firstCarCreated = {
      brand: 'brand one',
      category_id: '1121212',
      daily_rate: 10,
      description: 'the firstcar do ppt',
      fine_amount: 100,
      license_plate: 'ABX-7851',
      name: 'name one',
    }

    const secondCarCreated = {
      brand: 'brand second',
      category_id: '123112',
      daily_rate: 8,
      description: 'the second car do ppt',
      fine_amount: 90,
      license_plate: firstCarCreated.license_plate,
      name: 'name second',
    }

    expect(async () => {
      await createCarUseCase.execute(firstCarCreated)
      await createCarUseCase.execute(secondCarCreated)
    }).toBeInstanceOf(AppError)
  })

  it('should be able to create a new car with available true by default', async () => {
    const { available } = await createCarUseCase.execute({
      brand: 'brand',
      category_id: 'cate',
      daily_rate: 100,
      description: 'decription',
      fine_amount: 10,
      license_plate: 'AFZ-4318',
      name: 'bmw',
    })

    expect(available).toBe(true)
  })
})
