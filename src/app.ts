import * as bodyParser from 'body-parser'
import * as express from 'express'
import { Index } from './routes/index'
import './config/database'

class App {
  public app: express.Application
  public indexRoutes: Index = new Index()

  constructor() {
    this.app = express()
    this.app.use(bodyParser.json())
    this.indexRoutes.routes(this.app)
  }
}

export default new App().app
