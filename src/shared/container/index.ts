import { UsersRepository } from '@modules/accounts/infra'
import { IUsersRepository } from '@modules/accounts/repositories'
import {
  CategoriesRepository,
  SpecificationRepository,
} from '@modules/cars/infra'
import {
  ICategoriesRepositoy,
  ISpecificationRepository,
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
