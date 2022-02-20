import { UsersRepository } from '@modules/accounts/infra'
import { IUsersRepository } from '@modules/accounts/repositories'
import {
  CategoriesRepository,
  SpecificationRepository,
} from '@modules/cars/infra/typeorm/repositories'
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'
import {
  ICarsRepository,
  ICategoriesRepository,
  ISpecificationRepository,
} from '@modules/cars/repositories'
import { ICarsImagesRepository } from '@modules/cars/repositories/interfaces/ICarsImage'
import { container } from 'tsyringe'

import { DayJsDateProvider } from './providers/DateProvider/implementations'
import { IDateProvider } from './providers/DateProvider/interfaces'

container.registerSingleton<ICategoriesRepository>(
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

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)

container.registerSingleton<ICarsImagesRepository>(
  'CarsImagesRepository',
  CarsImagesRepository
)

container.registerSingleton<IDateProvider>(
  'DayJsDateProvider',
  DayJsDateProvider
)
