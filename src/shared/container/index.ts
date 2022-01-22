import {
  IUsersRepository,
  UsersRepository,
} from '@modules/accounts/repositories'
import {
  CategoriesRepository,
  ICategoriesRepositoy,
  ISpecificationRepository,
  SpecificationRepository,
} from '@modules/cars/repositories'
import { container } from 'tsyringe'

container.registerSingleton<ICategoriesRepositoy>(
  'CategoriesRepository',
  CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)
