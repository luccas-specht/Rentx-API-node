import { ISpecificationRepository } from '../../repositories'

interface IRequest {
  name: string
  description: string
}

export class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationRepository) {}

  execute({ name, description }: IRequest): void {
    const specificationNameAlreadyExists =
      this.specificationRepository.checkIfSpecificationNameIsUnique(name)

    if (specificationNameAlreadyExists)
      throw new Error('Specification Already exists!')

    this.specificationRepository.create({ name, description })
  }
}
