import { Category } from '@modules/cars/entities'

// DTO -> Data trasnfer Object
// Conceito de criar um obj que é responsavel por fazer a transferencia de dados entre uma camada e outra
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
