import { Category } from '../../entities'
import { ICategoriesRepositoy } from '../../repositories'

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepositoy) {}

  async execute(): Promise<Category[]> {
    const list = await this.categoriesRepository.list()
    return list
  }
}
