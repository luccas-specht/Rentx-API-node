import { container } from 'tsyringe'

import {
  CategoriesRepository,
  ICategoriesRepositoy,
} from '../../modules/cars/repositories'

container.registerSingleton<ICategoriesRepositoy>(
  'CategoriesRepository',
  CategoriesRepository
)
