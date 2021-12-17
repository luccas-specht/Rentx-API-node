import express from 'express'

import { routers } from './routers'

const app = express()

app.listen(3333, () => console.log('Server started in port: 3333 🚀'))
app.use(express.json())
app.use(routers)
