import { getRepository, Repository } from 'typeorm'

import { Category } from '../../entities'
import { ICreateCategoryDTO, ICategoriesRepositoy } from '../interfaces'

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
    // quando a promise é direta no  return **NÃO PRECISA DE  AWAIT**. ESLint error: Redundant use of `await` on a return value.eslint
    const list = await this.repository.find()
    return list
  }

  async checkIfCategoryNameIsUnique(name: string): Promise<boolean> {
    // select * from categories where name = "name" limit 1
    const categoryNameAlreadyExists = await this.repository.findOne({ name })
    return !!categoryNameAlreadyExists
  }
}
