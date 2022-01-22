import { Specification } from '@modules/cars/entities'
import { ISpecificationRepository } from '@modules/cars/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute(): Promise<Specification[]> {
    return this.specificationRepository.list()
  }
}
