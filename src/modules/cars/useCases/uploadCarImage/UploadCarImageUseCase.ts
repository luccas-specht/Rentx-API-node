import { ICarsImagesRepository } from '@modules/cars/repositories/interfaces/ICarsImage'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  car_id: string
  images_name: string[]
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private readonly carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.forEach(async (image) => {
      await this.carsImagesRepository.create(car_id, image)
    })
  }
}
