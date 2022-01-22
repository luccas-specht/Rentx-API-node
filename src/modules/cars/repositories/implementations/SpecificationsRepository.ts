import { getRepository, Repository } from 'typeorm'
import { Specification } from '@modules/cars/entities'

import { ISpecificationRepository, ICreateSpecificationDTO } from '..'

export class SpecificationRepository implements ISpecificationRepository {
  constructor(
    private repository: Repository<Specification> = getRepository(Specification)
  ) {}

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    })
    await this.repository.save(specification)
  }

  async list(): Promise<Specification[]> {
    return this.repository.find()
  }

  async checkIfSpecificationNameIsUnique(name: string): Promise<boolean> {
    const specificationNameAlreadyExists = await this.repository.findOne({
      name,
    })
    return !!specificationNameAlreadyExists
  }
}
