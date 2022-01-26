import express, { NextFunction, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'

import { AppError } from '@shared/errors/AppError'
import { routers } from '@shared/infra'

import '@shared/infra/typeormDatabase'
import '@shared/container'

import swaggerFile from './swagger.json'

const app = express()

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(routers)
app.use(
  (
    error: Error,
    request: Request,
    response: Response,
    nextFunction: NextFunction
  ) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      })
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${error.message}`,
    })
  }
)
app.listen(3333, () => console.log('Server started in port: 3333 🚀'))