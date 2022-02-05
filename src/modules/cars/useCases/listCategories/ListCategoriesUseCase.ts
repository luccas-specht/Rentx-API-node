import { Category } from '@modules/cars/infra'
import { ICategoriesRepositoy } from '@modules/cars/repositories'
import { inject, injectable } from 'tsyringe'

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
