import { container } from 'tsyringe'

import { DayJsDateProvider } from './DateProvider/implementations'
import { IDateProvider } from './DateProvider/interfaces'

container.registerSingleton<IDateProvider>(
  'DayJsDateProvider',
  DayJsDateProvider
)
