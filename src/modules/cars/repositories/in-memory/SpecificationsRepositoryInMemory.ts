import { ICreateSpecificationDTO } from '@modules/cars/dtos'
import { Specification } from '@modules/cars/infra'

import { ISpecificationRepository } from '..'

export class SpecificationsRepositoryInMemory
  implements ISpecificationRepository
{
  specifications: Specification[] = []

  async list(): Promise<Specification[]> {
    return this.specifications
  }

  async checkIfSpecificationNameIsUnique(name: string): Promise<boolean> {
    return !!this.specifications.find(
      (specification) => specification.name === name
    )
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification()

    Object.assign(specification, {
      name,
      description,
    })

    this.specifications.push(specification)
    return specification
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter(({ id }) =>
      ids.includes(id)
    )
    return allSpecifications
  }
}
