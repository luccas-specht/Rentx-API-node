import { Router } from 'express'
import multer from 'multer'

import { uploadConfig } from '../config'
import { ensureAuthenticated } from '../middlewares'
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController'
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/ListCategoriesController'

export const categoriesRoutes = Router()

const uploadCategories = multer(uploadConfig.upload('./tmp'))

const listCategoriesController = new ListCategoriesController()
const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()

categoriesRoutes.use(ensureAuthenticated)
categoriesRoutes.get('/', listCategoriesController.handle)
categoriesRoutes.post('/', createCategoryController.handle)
categoriesRoutes.post(
  '/import',
  uploadCategories.single('file'),
  importCategoryController.handle
)
