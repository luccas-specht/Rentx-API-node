import { inject, injectable } from 'tsyringe'

import { ICategoriesRepositoy } from '../../repositories'

interface IRequest {
  name: string
  description: string
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepositoy')
    private categoriesRepository: ICategoriesRepositoy
  ) {}

  private async checkIfCategoryAlreadyExists(name: string): Promise<void> {
    const categoryAlreadyExists =
      await this.categoriesRepository.checkIfCategoryNameIsUnique(name)

    if (categoryAlreadyExists) throw new Error('category already exists')
  }

  async execute({ name, description }: IRequest): Promise<void> {
    await this.checkIfCategoryAlreadyExists(name)
    await this.categoriesRepository.create({ name, description })
  }
}
