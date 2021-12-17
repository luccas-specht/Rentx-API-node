import { Category } from '../../models'

// DTO -> Data trasnfer Object
// Conceito de criar um obj que é responsavel por fazer a transferencia de dados entre uma camada e outra
export interface ICreateCategoryDTO {
  name: string
  description: string
}

export interface ICategoriesRepositoy {
  list(): Category[]
  create(data: ICreateCategoryDTO): void
  checkIfCategoryNameIsUnique(name: string): boolean
}
