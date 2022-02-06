import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Category } from '.'

@Entity('cars')
export class Car {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  brand: string

  @Column()
  daily_rate: number

  @Column()
  fine_amount: number

  @Column()
  description: string

  @Column()
  license_plate: string

  @Column()
  available: boolean

  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @Column()
  category_id: string

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
      this.available = true
    }
  }
}
