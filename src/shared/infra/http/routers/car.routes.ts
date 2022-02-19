import { uploadConfig } from '@config/upload'
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImage/UploadCarImagesController'
import { Router } from 'express'
import multer from 'multer'

import { ensureAdmin, ensureAuthenticated } from '@shared/infra/'

export const carsRoutes = Router()
const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesUseController = new UploadCarImagesController()

const upload = multer(uploadConfig.upload('./tmp/cars'))

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
)
carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
)
carsRoutes.get('/available', listAvailableCarsController.handle)

carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarImagesUseController.handle
)
