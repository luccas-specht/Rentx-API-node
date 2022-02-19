import { CarImages } from '@modules/cars/infra/typeorm/entities/CarImages'

export interface ICarsImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImages>
}
