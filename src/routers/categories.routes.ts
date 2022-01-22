import { uploadConfig } from '@config/upload'
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated'
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController'
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController'
import { Router } from 'express'
import multer from 'multer'

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
