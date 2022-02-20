import { ICreateCategoryDTO } from '@modules/cars/dtos'
import { Category } from '@modules/cars/infra'

export interface ICategoriesRepository {
  list(): Promise<Category[]>
  create(data: ICreateCategoryDTO): Promise<void>
  findByName(name: string): Promise<Category | undefined>
  checkIfCategoryNameIsUnique(name: string): Promise<boolean>
}
