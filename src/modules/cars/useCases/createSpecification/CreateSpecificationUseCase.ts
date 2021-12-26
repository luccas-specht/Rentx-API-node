import { inject, injectable } from 'tsyringe'

import { ISpecificationRepository } from '../../repositories'

interface IRequest {
  name: string
  description: string
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationNameAlreadyExists =
      await this.specificationRepository.checkIfSpecificationNameIsUnique(name)

    if (specificationNameAlreadyExists)
      throw new Error('Specification Already exists!')

    await this.specificationRepository.create({ name, description })
  }
}
