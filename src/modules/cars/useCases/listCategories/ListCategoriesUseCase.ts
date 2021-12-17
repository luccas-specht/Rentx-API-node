import { Category } from '../../models'
import { ICategoriesRepositoy } from '../../repositories'

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepositoy) {}

  execute(): Category[] {
    return this.categoriesRepository.list()
  }
}
