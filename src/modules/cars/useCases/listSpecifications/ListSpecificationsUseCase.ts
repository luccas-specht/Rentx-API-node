import { Specification } from '../../models'
import { ISpecificationRepository } from '../../repositories'

export class ListSpecificationsUseCase {
  constructor(private specificationRepository: ISpecificationRepository) {}

  execute(): Specification[] {
    return this.specificationRepository.list()
  }
}
