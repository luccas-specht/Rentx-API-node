import 'reflect-metadata'

import '@shared/infra/typeorm'
import '@shared/container'
import 'express-async-errors'

import express, { NextFunction, Request, Response } from 'express'
/* import swaggerUi from 'swagger-ui-express' */

import { AppError } from '@shared/errors/AppError'
import { routers } from '@shared/infra/http/routers'

/* import swaggerFile from './swagger.json' */

export const app = express()

app.use(express.json())
/* app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile)) */
app.use(routers)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      })
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal server err - ${err.message}`,
    })
  }
)
