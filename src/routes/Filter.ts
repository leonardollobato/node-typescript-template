import { Application } from 'express'

import {
  addFilter,
  getFilter,
  getFilters,
  removeFilter,
  updateFilter,
} from '../controllers'

export class FilterRoute {
  public routes(app: Application): void {
    app.route('/filters').get(getFilters)
    app.route('/filters/:id').get(getFilter)
    app.route('/filters').post(addFilter)
    app.route('/filters/:id').patch(updateFilter)
    app.route('/filters/:id').delete(removeFilter)
  }
}
