import { uploadConfig } from '@config/upload'
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated'
import { CreateUserController } from '@modules/accounts/useCases/createUser'
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar'
import { Router } from 'express'
import multer from 'multer'

export const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

usersRoutes.post('/', createUserController.handle)
usersRoutes.patch(
  '/avatar',
  uploadAvatar.single('avatar'),
  ensureAuthenticated,
  updateUserAvatarController.handle
)
