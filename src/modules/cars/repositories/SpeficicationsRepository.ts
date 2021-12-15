import { ISpecificationRepository, ICreateSpecificationDTO } from '.'
import { Specification } from '../models'

export class SpecificationRepository implements ISpecificationRepository {
  constructor(private specifications: Specification[] = []) {}

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification()

    // pega todas as informações que foram passadas para dentro dele e vai setar para dentro do obj **specification**
    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    })

    this.specifications.push(specification)
  }

  checkIfSpecificationNameIsUnique(name: string): boolean {
    const isThereSpecification = this.specifications.some(
      (specification) =>
        specification.name.trim().toUpperCase() === name.trim().toUpperCase()
    )

    return isThereSpecification
  }
}
