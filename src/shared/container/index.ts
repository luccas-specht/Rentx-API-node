import { container } from 'tsyringe'

import {
  CategoriesRepository,
  ICategoriesRepositoy,
  ISpecificationRepository,
  SpecificationRepository,
} from '../../modules/cars/repositories'

container.registerSingleton<ICategoriesRepositoy>(
  'CategoriesRepository',
  CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository
)
