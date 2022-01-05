import { inject, injectable } from 'tsyringe'

import { AppError } from '../../../../errors'
import { ICategoriesRepositoy } from '../../repositories'

interface IRequest {
  name: string
  description: string
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepositoy
  ) {}

  private async checkIfCategoryAlreadyExists(name: string): Promise<void> {
    const categoryAlreadyExists =
      await this.categoriesRepository.checkIfCategoryNameIsUnique(name)

    if (categoryAlreadyExists) throw new AppError('category already exists')
  }

  async execute({ name, description }: IRequest): Promise<void> {
    await this.checkIfCategoryAlreadyExists(name)
    await this.categoriesRepository.create({ name, description })
  }
}
