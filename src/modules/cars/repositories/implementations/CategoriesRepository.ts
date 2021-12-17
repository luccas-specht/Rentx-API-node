import { Category } from '../../models'
import { ICreateCategoryDTO, ICategoriesRepositoy } from '../interfaces'

// singleton -> esse padrão de projeto tem como definição criar apenas uma instancia de uma classe(um obj) que vai ser uma instancia global
export class CategoriesRepository implements ICategoriesRepositoy {
  private static INSTANCE: CategoriesRepository

  private constructor(private categories: Category[] = []) {}

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository()
    }
    return CategoriesRepository.INSTANCE
  }

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
    const categoryNameAlreadyExists = this.categories.some(
      (category) =>
        category.name.trim().toUpperCase() === name.trim().toUpperCase()
    )

    return categoryNameAlreadyExists
  }
}
