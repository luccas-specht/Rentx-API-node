import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory'

import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it('should be able to create a new car', async () => {
    await createCarUseCase.execute({
      brand: 'brand',
      category_id: 'cate',
      daily_rate: 100,
      description: 'decription',
      fine_amount: 10,
      license_plate: 'AFZ-4318',
      name: '',
    })
  })
})
