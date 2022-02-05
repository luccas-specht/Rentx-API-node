import { ICreateCategoryDTO } from '@modules/cars/dtos'
import { Category } from '@modules/cars/infra'
import { ICategoriesRepositoy } from '@modules/cars/repositories'
import { getRepository, Repository } from 'typeorm'

export class CategoriesRepository implements ICategoriesRepositoy {
  constructor(
    private repository: Repository<Category> = getRepository(Category)
  ) {}

  async findByName(name: string): Promise<Category | undefined> {
    return this.repository.findOne({ name })
  }

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
