export interface IDateProvider {
  dateNow(): Date
  convertToUtc(date: Date): string
  compareInHours(start: Date, end: Date): number
  compareInDays(start: Date, end: Date): number
}
