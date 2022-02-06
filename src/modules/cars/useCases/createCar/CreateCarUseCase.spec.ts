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

  it('should not be able to create a new category with same name', async () => {
    try {
      await createCarUseCase.execute({
        brand: '',
        category_id: '',
        daily_rate: 1,
        description: '',
        fine_amount: 1,
        license_plate: 'aa',
        name: '',
      })

      await createCarUseCase.execute({
        brand: '',
        category_id: '',
        daily_rate: 1,
        description: '',
        fine_amount: 1,
        license_plate: 'aa',
        name: '',
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
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
