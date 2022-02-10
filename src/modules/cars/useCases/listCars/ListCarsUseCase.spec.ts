import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory'

import { ListCarsUseCase } from './ListCarsUseCase'

let carsRepositoryInMemory: CarsRepositoryInMemory
let listCarsUseCase: ListCarsUseCase

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory)
  })

  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'car',
      category_id: '123112',
      daily_rate: 8,
      description: 'car do ppt',
      fine_amount: 90,
      license_plate: 'AAB-FT12',
      name: 'car',
    })
    const result = await listCarsUseCase.execute({})

    expect(result).toEqual([car])
  })

  it('Should be able to list all available cars by name', async () => {
    const car2 = await carsRepositoryInMemory.create({
      brand: 'car2',
      category_id: '123112',
      daily_rate: 8,
      description: 'car do ppt',
      fine_amount: 90,
      license_plate: 'AAB-FT12',
      name: 'car001',
    })

    const result = await listCarsUseCase.execute({
      brand: car2.brand,
    })

    expect(result).toEqual([car2])
  })
})
