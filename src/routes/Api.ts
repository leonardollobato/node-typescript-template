import { getApi } from '../controllers'

export class APIRoute {
  public routes(App): void {
    App.route('/api').get(getApi)
  }
}
