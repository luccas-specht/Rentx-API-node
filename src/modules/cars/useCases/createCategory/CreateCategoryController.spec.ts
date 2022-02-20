import { hash } from 'bcryptjs'
import request from 'supertest'
import { Connection } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { app } from '@shared/infra/http/app'
import createConnection from '@shared/infra/typeorm/index'

let connection: Connection

describe('Create category controller', () => {
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

  it('should be able to create a new category', async () => {
    const {
      body: { token },
    } = await request(app).post('/sessions').send({
      email: 'fakeadmin@rentx.com.br',
      password: 'fakeadmin',
    })

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Fake category',
        description: 'Fake description',
      })
      .set({ Authorization: `Bearer ${token}` })

    expect(response.status).toBe(201)
  })

  it('should not be able to create a new category with name exists', async () => {
    const {
      body: { token },
    } = await request(app).post('/sessions').send({
      email: 'fakeadmin@rentx.com.br',
      password: 'fakeadmin',
    })

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Fake category',
        description: 'Fake description',
      })
      .set({ Authorization: `Bearer ${token}` })

    expect(response.status).toBe(400)
  })
})
