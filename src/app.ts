import * as bodyParser from 'body-parser'
import * as express from 'express'
import { FilterRoute, TrainingRoute, UserRoute, APIRoute } from '../src/routes'
//import './config/database'

class App {
  public app: express.Application
  public userRoutes: UserRoute = new UserRoute()
  public apiRoutes: APIRoute = new APIRoute()
  public filterRoutes: FilterRoute = new FilterRoute()
  public trainingRoutes: TrainingRoute = new TrainingRoute()

  constructor() {
    this.app = express()
    this.app.use(bodyParser.json())
    this.userRoutes.routes(this.app)
    this.apiRoutes.routes(this.app)
    this.filterRoutes.routes(this.app)
    this.trainingRoutes.routes(this.app)
  }
}

export default new App().app
