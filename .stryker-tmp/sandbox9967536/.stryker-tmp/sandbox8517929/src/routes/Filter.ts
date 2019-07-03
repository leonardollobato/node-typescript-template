import {
  addFilter,
  getFilter,
  getFilters,
  removeFilter,
  updateFilter,
} from '../controllers'

export class FilterRoute {
  public routes(App): void {
    App.route('/filters').get(getFilters)
    App.route('/filters/:id').get(getFilter)
    App.route('/filters').post(addFilter)
    App.route('/filters/:id').patch(updateFilter)
    App.route('/filters/:id').delete(removeFilter)
  }
}
