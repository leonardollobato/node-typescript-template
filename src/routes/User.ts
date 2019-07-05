import { Application } from 'express'

import {
  addUser,
  getUser,
  getUsers,
  removeUser,
  updateUser,
} from '../controllers'

export class UserRoute {
  public routes(app: Application): void {
    app.route('/users').get(getUsers)
    app.route('/users/:id').get(getUser)
    app.route('/users').post(addUser)
    app.route('/users/:id').patch(updateUser)
    app.route('/users/:id').delete(removeUser)
  }
}
