import { inject, injectable } from 'tsyringe'

import { deleteFile } from '../../../../utils/file'
import { UsersRepository } from '../../repositories'

interface IRequest {
  user_id: string
  avatar_file: string
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepository
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id)
    const completePathToTmpFolder = `./tmp/avatar/${user.avatar}`

    if (user.avatar) await deleteFile(completePathToTmpFolder)

    user.avatar = avatar_file
    await this.userRepository.updateUser(user)
  }
}
