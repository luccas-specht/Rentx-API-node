import { Router, Request, Response } from 'express'
import multer from 'multer'

import { createCategoryController } from '../modules/cars/useCases/createCategory'
import { listCategoriesController } from '../modules/cars/useCases/listCategories'

export const categoriesRoutes = Router()

/* link dock:  https://www.npmjs.com/package/multer */
const upload = multer({
  dest: './tmp',
})

categoriesRoutes.post('/', (request: Request, response: Response) =>
  createCategoryController.handle(request, response)
)

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  (request: Request, response: Response) => {
    const { file } = request

    return response.send()
  }
)

categoriesRoutes.get('/', (request: Request, response: Response) =>
  listCategoriesController.handle(request, response)
)
