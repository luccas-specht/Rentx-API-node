import { Router, Request, Response } from 'express'
import multer from 'multer'

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController'
import importCategoryController from '../modules/cars/useCases/importCategory'
import listCategoriesController from '../modules/cars/useCases/listCategories'

export const categoriesRoutes = Router()

const upload = multer({
  dest: './tmp',
})

const createCategoryController = new CreateCategoryController()

categoriesRoutes.post('/', createCategoryController.handle)

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  (request: Request, response: Response) =>
    importCategoryController().handle(request, response)
)

categoriesRoutes.get('/', (request: Request, response: Response) =>
  listCategoriesController().handle(request, response)
)
