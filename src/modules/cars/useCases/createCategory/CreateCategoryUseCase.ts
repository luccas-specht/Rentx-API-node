import { ICategoriesRepositoy } from '../../repositories'

interface IRequest {
  name: string
  description: string
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepositoy) {}

  private checkIfCategoryAlreadyExists(name: string): void {
    const categoryAlreadyExists =
      this.categoriesRepository.checkIfCategoryNameIsUnique(name)

    if (categoryAlreadyExists) throw new Error('category already exists')
  }

  execute({ name, description }: IRequest): void {
    this.checkIfCategoryAlreadyExists(name)
    this.categoriesRepository.create({ name, description })
  }
}
