import 'reflect-metadata'
import { createConnection, getRepository, Connection } from 'typeorm'
import * as faker from 'faker'
import { Filter, Training, User } from '../models'

export class Database {
  constructor(build: any) {
    //this.connection = build.connection
    if (arguments.length === 1 && this.validateBuild(build)) {
      let rows = build.rows
      let filterRows = build.filterRows
      let trainingRows = build.trainingRows

      Object.defineProperties(this, {
        _rows: {
          value: rows,
          writable: false,
        },
        _filterRows: {
          value: filterRows,
          writable: false,
        },
        _trainingRows: {
          value: trainingRows,
          writable: false,
        },
      })
    }
  }

  validateBuild(build) {
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
        this._userRows = rows
        return this
      }

      withTrainingSeed(rows: number) {
        this._trainingRows = rows
        return this
      }

      _runTrainingSeed() {
        const userRepository = getRepository(User)

        for (let index = 0; index < this._trainingRows; index++) {
          let user = new User()
          user.email = faker.internet.email()
          user.password = faker.random.alphaNumeric(8)
          user.firstname = faker.name.firstName()
          user.lastname = faker.name.lastName()
          user.username = faker.finance.accountName()
          userRepository.save(user)
        }
      }

      _runUserSeed() {
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

      build() {
        this._initialize()

        if (this._userRows > 0) this._runUserSeed()
        if (this._trainingRows > 0) this._runTrainingSeed()

        return new Database(this)
      }
    }
    return Builder
  }
}
