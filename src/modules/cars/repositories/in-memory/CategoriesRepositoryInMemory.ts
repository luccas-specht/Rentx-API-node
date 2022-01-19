import { ICategoriesRepositoy } from '..'

import { Category } from '../../entities'
import { ICreateCategoryDTO } from '../interfaces'

export class CategoriesRepositoryInMemory implements ICategoriesRepositoy {
  categories: Category[] = []

  async list(): Promise<Category[]> {
    return this.categories
  }

  async findByName(name: string): Promise<Category> {
    return this.categories.find((category) => category.name === name)
  }

  async create(data: ICreateCategoryDTO): Promise<void> {
    const { name, description } = data
    const category = new Category()

    Object.assign(category, {
      name,
      description,
    })

    this.categories.push(category)
  }

  async checkIfCategoryNameIsUnique(name: string): Promise<boolean> {
    const category = this.categories.find((category) => category.name === name)
    return !!category
  }
}
