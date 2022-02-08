import { uploadConfig } from '@config/upload'
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController'
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController'
import { Router } from 'express'
import multer from 'multer'

import { ensureAdmin, ensureAuthenticated } from '@shared/infra/'

export const categoriesRoutes = Router()

const uploadCategories = multer(uploadConfig.upload('./tmp'))

const listCategoriesController = new ListCategoriesController()
const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()

categoriesRoutes.get('/', ensureAuthenticated, listCategoriesController.handle)
categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
)
categoriesRoutes.post(
  '/import',
  ensureAuthenticated,
  ensureAdmin,
  uploadCategories.single('file'),
  importCategoryController.handle
)
