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
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository'
import { IRentalsRepository } from '@modules/rentals/repositories'
import { container } from 'tsyringe'
import '@shared/container/providers'

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

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository
)
