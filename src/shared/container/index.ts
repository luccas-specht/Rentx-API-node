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
  ICategoriesRepositoy,
  ISpecificationRepository,
} from '@modules/cars/repositories'
import { ICarsImagesRepository } from '@modules/cars/repositories/interfaces/ICarsImage'
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

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)

container.register<ICarsImagesRepository>(
  'CarsImagesRepository',
  CarsImagesRepository
)
