import express from 'express'
import swaggerUi from 'swagger-ui-express'

import './database'
import './shared/container'
import { routers } from './routers'
import swaggerFile from './swagger.json'

const app = express()

app.listen(3333, () => console.log('Server started in port: 3333 🚀'))

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(routers)
