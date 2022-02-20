import { hash } from 'bcryptjs'
import request from 'supertest'
import { Connection } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { app } from '@shared/infra/http/app'
import createConnection from '@shared/infra/typeorm/index'

let connection: Connection

describe('List categories controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuidV4()
    const password = 'fakeadmin'
    const passwordHash = await hash(password, 8)

    await connection.query(`
        INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'fakeadmin@rentx.com.br', '${passwordHash}', true, 'now()', 'XXX-000')
        `)
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able to list all categories', async () => {
    const {
      body: { token },
    } = await request(app).post('/sessions').send({
      email: 'fakeadmin@rentx.com.br',
      password: 'fakeadmin',
    })

    await request(app)
      .post('/categories')
      .send({
        name: 'Fake category',
        description: 'Fake description',
      })
      .set({ Authorization: `Bearer ${token}` })

    const { body, status } = await request(app).get('/categories')

    expect(status).toBe(200)
    expect(body).toHaveLength(1)
    expect(body[0]).toHaveProperty('id')
    expect(body[0].name).toEqual('Fake category')
  })
})
