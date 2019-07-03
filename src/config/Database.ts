import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { Filter, Training, User } from '../models'

// TODO: put on env file
createConnection({
  database: 'newtraining',
  entities: [Filter, Training, User],
  host: '127.0.0.1',
  logging: true,
  password: 'vassoura',
  port: 33061,
  synchronize: true,
  type: 'mariadb',
  username: 'root',
  dropSchema: true,
})
  .then(connection => {
    // TODO: remove console
    // tslint:disable-next-line: no-console
    console.info('database connection established', connection.name)
  })
  // TODO: remove console
  // tslint:disable-next-line: no-console
  .catch(error => console.log)
