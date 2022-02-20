import request from 'supertest'

import { app } from '@shared/infra/http/app'

describe('Create category controller', async () => {
  await request(app).get('/cars/available').expect(201)
})
