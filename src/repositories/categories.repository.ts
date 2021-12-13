import { Category } from '../models'

// DTO -> Data trasnfer Object
// Conceito de criar um obj que é responsavel por fazer a transferencia de dados entre uma camada e outra

interface ICreateCategoryDTO {
  name: string
  description: string
}

export class CategoriesRepository {
  private categories: Category[]

  constructor() {
    this.categories = []
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
    const isThereCategory = this.categories.some(
      (category) =>
        category.name.trim().toUpperCase() === name.trim().toUpperCase()
    )

    return isThereCategory
  }
}
