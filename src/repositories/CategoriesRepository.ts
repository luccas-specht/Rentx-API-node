import { Category } from '../models'
import {
  ICreateCategoryDTO,
  ICategoriesRepositoy,
} from './ICategoriesRepository'

export class CategoriesRepository implements ICategoriesRepositoy {
  constructor(private categories: Category[] = []) {}

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category()

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    })

    this.categories.push(category)
  }

  list(): Category[] {
    return this.categories
  }

  checkIfCategoryNameIsUnique(name: string): boolean {
    const isThereCategory = this.categories.some(
      (category) =>
        category.name.trim().toUpperCase() === name.trim().toUpperCase()
    )

    return isThereCategory
  }
}
