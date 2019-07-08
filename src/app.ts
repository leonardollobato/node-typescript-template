import * as bodyParser from 'body-parser'
import * as express from 'express'
import { FilterRoute, TrainingRoute, UserRoute, APIRoute } from './routes'
import { Database, DatabaseBuilder } from './config/Database'

class App {
  public app: express.Application
  private db: Database

  public userRoutes: UserRoute = new UserRoute()
  public apiRoutes: APIRoute = new APIRoute()
  public filterRoutes: FilterRoute = new FilterRoute()
  public trainingRoutes: TrainingRoute = new TrainingRoute()

  constructor() {
    //Database.UserSeed(20)
    const db = new DatabaseBuilder().withUserSeed(100).build()
    db.runSeeders()
    this.app = express()
    this.app.use(bodyParser.json())
    this.userRoutes.routes(this.app)
    this.apiRoutes.routes(this.app)
    this.filterRoutes.routes(this.app)
    this.trainingRoutes.routes(this.app)
  }
}

export default new App().app
