import express from 'express'
import swaggerUi from 'swagger-ui-express'

import { routers } from './routers'
import swaggerFile from './swagger.json'
import './database'

const app = express()

app.listen(3333, () => console.log('Server started in port: 3333 🚀'))

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(routers)
