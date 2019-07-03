import {
  addUser,
  getUser,
  getUsers,
  removeUser,
  updateUser,
} from '../controllers'

export class UserRoute {
  public routes(App): void {
    App.route('/users').get(getUsers)
    App.route('/users/:id').get(getUser)
    App.route('/users').post(addUser)
    App.route('/users/:id').patch(updateUser)
    App.route('/users/:id').delete(removeUser)
  }
}
