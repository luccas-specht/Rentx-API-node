import { ISpecificationRepository } from '../repositories'

interface IRequest {
  name: string
  description: string
}

export class CreateSpecificationService {
  constructor(private specificationRepository: ISpecificationRepository) {}

  execute({ name, description }: IRequest): void {
    const specificationNameAlreadyWasUsed =
      this.specificationRepository.checkIfSpecificationNameIsUnique(name)

    if (specificationNameAlreadyWasUsed)
      throw new Error('Specification Already exists!')

    this.specificationRepository.create({ name, description })
  }
}
