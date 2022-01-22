import { AppError } from '@errors/AppError'
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

// agroup tests
/* describe('Examples', () => {
  // tests always are inside it()
  it('Espero que a soma de 2 + 2 seja 4', () => {
    const sum = 2 + 2
    const result = 4
    expect(sum).toBe(result)
  })
  it('Espero que 2 + 2 !== 5', () => {
    const sum = 2 + 2
    const result = 5

    expect(sum).not.toBe(result)
  })
}) */

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    )
  })

  it('should be able to create a new category', async () => {
    const category = {
      name: 'HUV - Honda Civic',
      description: 'Honda is a tega',
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    })

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    )

    expect(categoryCreated).toHaveProperty('id')
  })

  it('should not be able to create a new category with same name', () => {
    expect(async () => {
      const category = {
        name: 'HUV - Honda Civic',
        description: 'Honda is a tega',
      }

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
