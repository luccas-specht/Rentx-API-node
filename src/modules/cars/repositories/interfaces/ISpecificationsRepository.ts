import { ICreateSpecificationDTO } from '@modules/cars/dtos'
import { Specification } from '@modules/cars/infra'

export interface ISpecificationRepository {
  list(): Promise<Specification[]>
  checkIfSpecificationNameIsUnique(name: string): Promise<boolean>
  create({ name, description }: ICreateSpecificationDTO): Promise<void>
}
