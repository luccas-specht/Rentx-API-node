import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { IDateProvider } from '../interfaces'

dayjs.extend(utc)

export class DayJsDateProvider implements IDateProvider {
  dateNow(): Date {
    return dayjs().toDate()
  }

  convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format()
  }

  compareInHours(start: Date, end: Date): number {
    const end_date_utc = this.convertToUtc(end)
    const start_date_utc = this.convertToUtc(start)

    return dayjs(end_date_utc).diff(dayjs(start_date_utc), 'hours')
  }

  compareInDays(start: Date, end: Date): number {
    const end_date_utc = this.convertToUtc(end)
    const start_date_utc = this.convertToUtc(start)

    return dayjs(end_date_utc).diff(dayjs(start_date_utc), 'days')
  }
}
