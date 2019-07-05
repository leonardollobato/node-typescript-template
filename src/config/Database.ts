import 'reflect-metadata'
import { createConnection, getRepository, Connection, Db } from 'typeorm'
import * as faker from 'faker'
import { Filter, Training, User } from '../models'

export class Database {
  private _userRows: number
  private _trainingRows: number

  constructor(build: any) {
    //this.connection = build.connection
    if (arguments.length === 1 && this._validateBuild(build)) {
      this._userRows = build.userRows
      this._trainingRows = build.trainingRows

      Object.defineProperties(this, {
        _filterRows: {
          value: this._userRows,
          writable: false,
        },
        _trainingRows: {
          value: this._trainingRows,
          writable: false,
        },
      })
    }
  }

  runUserSeed() {
    const userRepository = getRepository(User)

    for (let index = 0; index < this._userRows; index++) {
      let user = new User()
      user.email = faker.internet.email()
      user.password = faker.random.alphaNumeric(8)
      user.firstname = faker.name.firstName()
      user.lastname = faker.name.lastName()
      user.username = faker.finance.accountName()
      userRepository.save(user)
    }
  }

  _validateBuild(build) {
    return String(build.constructor) === String(Database.Builder)
  }

  static get Builder() {
    class Builder {
      private _userRows: number
      private _trainingRows: number

      constructor() {}

      private _initialize = () => {
        createConnection({
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
          .then(conn => {
            console.log('Connection Established Successfully')
          })
          .catch(err => {
            console.error(err)
          })
      }

      withUserSeed(rows: number) {
        console.log('withUserSeeder')
        this._userRows = rows
        return this
      }

      build() {
        const db = new Database(this)
        this._initialize()

        if (this._userRows > 0) db.runUserSeed()

        return db
      }
    }
    return Builder
  }
}
