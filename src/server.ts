import express from 'express'

import { categoriesRoutes } from './routers/categorites.routes'

const app = express()

app.listen(3333, () => {
  console.log('Server startes in port: 3333 🚀')
})

app.use(express.json())

app.use('/categories', categoriesRoutes)
