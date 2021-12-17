import { SpecificationRepository } from '../../repositories'
import { CreateSpecificationController } from './CreateSpecificationController'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

const specificationRepository = SpecificationRepository.getInstance()
const createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepository)

export const createSpecificationConttroller = new CreateSpecificationController(createSpecificationUseCase)