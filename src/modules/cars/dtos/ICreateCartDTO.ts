import { Specification } from '../infra'

export interface ICreateCarDTO {
  name: string
  brand: string
  description: string
  daily_rate: number
  license_plate: string
  fine_amount: number
  category_id: string
  specifications?: Specification[]
}
