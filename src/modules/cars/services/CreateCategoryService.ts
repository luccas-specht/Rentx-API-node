import { ICategoriesRepositoy } from '../repositories'

interface IRequest {
  name: string
  description: string
}

export class CreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepositoy) {}

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists =
      this.categoriesRepository.checkIfCategoryNameIsUnique(name)

    if (categoryAlreadyExists) throw new Error('category already exists')

    this.categoriesRepository.create({ name, description })
  }
}
