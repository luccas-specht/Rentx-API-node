import { Specification } from '@modules/cars/entities'

export interface ICreateSpecificationDTO {
  name: string
  description: string
}

export interface ISpecificationRepository {
  list(): Promise<Specification[]>
  checkIfSpecificationNameIsUnique(name: string): Promise<boolean>
  create({ name, description }: ICreateSpecificationDTO): Promise<void>
}
