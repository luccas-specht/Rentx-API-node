import { inject, injectable } from 'tsyringe'

import { Category } from '../../entities'
import { ICategoriesRepositoy } from '../../repositories'

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepositoy
  ) {}

  async execute(): Promise<Category[]> {
    return this.categoriesRepository.list()
  }
}
