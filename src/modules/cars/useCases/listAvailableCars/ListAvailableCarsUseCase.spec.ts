import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory'

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

let carsRepositoryInMemory: CarsRepositoryInMemory
let listAvailableCarsUseCase: ListAvailableCarsUseCase

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    )
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
    const result = await listAvailableCarsUseCase.execute({})

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

    const result = await listAvailableCarsUseCase.execute({
      name: car2.name,
    })

    expect(result).toEqual([car2])
  })

  it('Should be able to list all available cars by brand', async () => {
    const car3 = await carsRepositoryInMemory.create({
      brand: 'car3',
      category_id: '123112',
      daily_rate: 8,
      description: 'car do ppt',
      fine_amount: 90,
      license_plate: 'AAB-FT12',
      name: 'car002',
    })

    const result = await listAvailableCarsUseCase.execute({
      brand: car3.brand,
    })

    expect(result).toEqual([car3])
  })

  it('Should be able to list all available cars by category id', async () => {
    const car4 = await carsRepositoryInMemory.create({
      brand: 'car4',
      category_id: 'ahsuagheywehvzctqrwtuqas',
      daily_rate: 8,
      description: 'car do ppt',
      fine_amount: 90,
      license_plate: 'AAB-FT12',
      name: 'car002',
    })

    const result = await listAvailableCarsUseCase.execute({
      category_id: car4.category_id,
    })

    expect(result).toEqual([car4])
  })
})
