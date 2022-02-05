/* import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid' */

/* @Entity('cars') */
export class Car {
  id: string
  name: string
  brand: string
  daily_rate: number
  fine_amount: number
  description: string
  available: boolean
  created_at: Date
  category_id: string
  license_plate: string
  /* constructor() {
    if (!this.id) this.id = uuidV4()
  } */
}
