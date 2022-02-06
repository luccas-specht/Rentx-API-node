import { v4 as uuidV4 } from 'uuid'

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

  constructor() {
    if (!this.id) this.id = uuidV4()
    this.available = true
    this.created_at = new Date()
  }
}
