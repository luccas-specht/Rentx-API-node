import { Category } from '@modules/cars/infra'

export interface ICreateCategoryDTO {
  name: string
  description: string
}

export interface ICategoriesRepositoy {
  list(): Promise<Category[]>
  create(data: ICreateCategoryDTO): Promise<void>
  findByName(name: string): Promise<Category | undefined>
  checkIfCategoryNameIsUnique(name: string): Promise<boolean>
}
