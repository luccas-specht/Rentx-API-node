import { inject, injectable } from 'tsyringe'

import { Specification } from '../../entities'
import { ISpecificationRepository } from '../../repositories'

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
