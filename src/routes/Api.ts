import { getApi } from '../controllers'
import { Application } from 'express'

export class APIRoute {
  public routes(app: Application): void {
    app.route('/api').get(getApi)
  }
}
