import { ICarsImagesRepository } from '@modules/cars/repositories/interfaces/ICarsImage'
import { getRepository } from 'typeorm'

import { CarImages } from '../entities/CarImages'

export class CarsImagesRepository implements ICarsImagesRepository {
  constructor(private readonly repository = getRepository(CarImages)) {}

  async create(car_id: string, image_name: string): Promise<CarImages> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    })

    await this.repository.save(carImage)

    return carImage
  }
}
