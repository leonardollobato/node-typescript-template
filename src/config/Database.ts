import 'reflect-metadata'
import {
  createConnection,
  Connection,
  getConnectionManager,
  ConnectionManager,
  ObjectType,
  Entity,
  Repository,
} from 'typeorm'
import * as faker from 'faker'
import { Filter, Training, User } from '../models'

export class Database {
  constructor(databaseBuilder: DatabaseBuilder) {}
}

export class DatabaseBuilder {
  private _connectionManager: ConnectionManager
  private _connection: Connection
  private _userRows: number
  private _trainingRows: number

  constructor() {
    this._initialize()
  }

  get userRows() {
    return this._userRows
  }

  // get connection() {
  //   return this.connectionManager.get('default')
  // }
  get connectionManager() {
    return getConnectionManager()
  }

  withUserSeed(rows: number) {
    this._userRows = rows
    return this
  }

  withTrainingSeed(rows: number) {
    this._trainingRows = rows
    return this
  }

  private runUserSeeder = async () => {
    if (!this.connectionManager.has('default')) {
      return
    }

    //const conn = await this.connection.connect()
    const repository = this._connection.getRepository(User)

    for (let index = 0; index < this._userRows; index++) {
      let entity = new User()
      entity.email = faker.internet.email()
      entity.password = faker.random.alphaNumeric(8)
      entity.firstname = faker.name.firstName()
      entity.lastname = faker.name.lastName()
      entity.username = faker.finance.accountName()
      repository.save(entity)
    }

    //conn.close()
  }

  private runTrainingSeeder = async () => {
    if (!this.connectionManager.has('default')) {
      return
    }

    const repository = this._connection.getRepository(Training)

    for (let index = 0; index < this._trainingRows; index++) {
      let entity = new Training()

      entity.name = faker.name.title()
      entity.description = faker.lorem.paragraphs(2)
      entity.downloadURL = faker.internet.url()
      entity.embedURL = faker.internet.url()
      entity.thumbnailURL = faker.internet.url()
      entity.detailURL = faker.internet.url()
      entity.contact = faker.name.firstName()
      entity.responsable = faker.name.lastName()
      entity.size = faker.random.number(900).toString()
      entity.duration = faker.random.number().toString()
      entity.internalViews = faker.random.number(900)
      entity.externalViews = faker.random.number(900)

      repository.save(entity)
    }

    //conn.close()
  }

  private _initialize = async () => {
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

    this._connection = await this.connectionManager.get('default').connect()
  }

  build() {
    const db = new Database(this)
    if (this._userRows > 0) this.runUserSeeder()
    if (this._trainingRows > 0) this.runTrainingSeeder()
    return db
  }
}
