import { ICreateRentalDTO } from '@modules/rentals/dtos'
import { IRentalsRepository } from '@modules/rentals/repositories'
import { getRepository } from 'typeorm'

import { Rental } from '../entities/Rental'

export class RentalsRepository implements IRentalsRepository {
  constructor(private readonly repository = getRepository(Rental)) {}

  async create({
    id,
    total,
    car_id,
    user_id,
    end_date,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      id,
      total,
      car_id,
      user_id,
      end_date,
      expected_return_date,
    })
    await this.repository.save(rental)
    return rental
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({
      where: { car_id, end_date: null },
    })
    return openByCar
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({
      where: { user_id, end_date: null },
    })
    return openByUser
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ id })
    return rental
  }
}
