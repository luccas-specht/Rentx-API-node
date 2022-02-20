import { hash } from 'bcryptjs'
import { v4 as uuidV4 } from 'uuid'

import createConnection from '../index'

async function create() {
  const connection = await createConnection('localhost')
  const id = uuidV4()
  const password = 'admin'
  const passwordHash = await hash(password, 8)

  await connection.query(`
      INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com.br', '${passwordHash}', true, 'now()', 'XXX-000')
      `)

  await connection.close()
}

create().then(() => console.log('user Admin Created!'))
