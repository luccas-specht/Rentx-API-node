import express from 'express'

import { categoriesRoutes } from './routers'

const app = express()

app.use(express.json())
app.use(categoriesRoutes)

app.listen(3333, () => {
  console.log('Server startes in port: 3333 🚀')
})
