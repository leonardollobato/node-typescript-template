import 'reflect-metadata'
import {
  createConnection,
  Connection,
  getConnectionManager,
  ConnectionManager,
} from 'typeorm'
import * as faker from 'faker'
import { Filter, Training, User } from '../models'

export class Database {
  private _userRows: number
  private _connectionManager: ConnectionManager
  private _connection: Connection

  constructor(databaseBuilder: DatabaseBuilder) {
    this._userRows = databaseBuilder.userRows
    this._connectionManager = databaseBuilder.connectionManager
    this._connection = databaseBuilder.connection
  }

  public runSeeders = async () => {
    if (this._connectionManager.has('default')) {
      const conn = await this._connection.connect()
      const userRepository = conn.getRepository(User)

      for (let index = 0; index < this._userRows; index++) {
        let user = new User()
        user.email = faker.internet.email()
        user.password = faker.random.alphaNumeric(8)
        user.firstname = faker.name.firstName()
        user.lastname = faker.name.lastName()
        user.username = faker.finance.accountName()
        userRepository.save(user)
      }
    } else {
      console.error('Connection Not Found')
    }
  }
}

export class DatabaseBuilder {
  private _connectionManager: ConnectionManager
  private _userRows: number

  constructor() {
    this._initialize()
  }

  get userRows() {
    return this._userRows
  }

  get connection() {
    return this.connectionManager.get('default')
  }
  get connectionManager() {
    return getConnectionManager()
  }

  withUserSeed(rows: number) {
    this._userRows = rows
    return this
  }

  private _initialize = () => {
    this.connectionManager.create({
      name: 'default',
      host: '127.0.0.1',
      port: 33061,
      username: 'root',
      password: 'vassoura',
      type: 'mariadb',
      database: 'newtraining',
      logging: true,
      synchronize: true,
      dropSchema: true,
      entities: [Filter, Training, User],
    })
  }

  build() {
    return new Database(this)
  }
}
