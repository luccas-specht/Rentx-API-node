import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory'

import { AppError } from '@shared/errors/AppError'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe('Create Category', () => {
  const category = {
    name: 'HUV - Honda Civic',
    description: 'Honda is a tega',
  }

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    )
  })

  it('should be able to create a new category', async () => {
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
