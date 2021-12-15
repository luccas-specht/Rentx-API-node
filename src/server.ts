import express from 'express'

import { categoriesRoutes, specificationRoutes } from './routers'

const app = express()

app.listen(3333, () => {
  console.log('Server startes in port: 3333 🚀')
})

app.use(express.json())
app.use('/categories', categoriesRoutes)
app.use('/specifications', specificationRoutes)
