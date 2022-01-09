import { getRepository, Repository } from 'typeorm'

import { Category } from '../../entities'

import { ICreateCategoryDTO, ICategoriesRepositoy } from '..'

export class CategoriesRepository implements ICategoriesRepositoy {
  constructor(
    private repository: Repository<Category> = getRepository(Category)
  ) {}

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    })
    await this.repository.save(category)
  }

  async list(): Promise<Category[]> {
    return this.repository.find()
  }

  async checkIfCategoryNameIsUnique(name: string): Promise<boolean> {
    const categoryNameAlreadyExists = await this.repository.findOne({ name })
    return !!categoryNameAlreadyExists
  }
}
