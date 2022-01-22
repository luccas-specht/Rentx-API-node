import { AppError } from '@errors/AppError'
import { ISpecificationRepository } from '@modules/cars/repositories'
import { inject, injectable } from 'tsyringe'

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
      throw new AppError('Specification Already exists!')

    await this.specificationRepository.create({ name, description })
  }
}
