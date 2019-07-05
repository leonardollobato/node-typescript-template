import { Application } from 'express'

import {
  addTraining,
  getTraining,
  getTrainings,
  removeTraining,
  updateTraining,
} from '../controllers'

export class TrainingRoute {
  public routes(app: Application): void {
    app.route('/trainings/:id').get(getTraining)
    app.route('/trainings').get(getTrainings)
    app.route('/trainings').post(addTraining)
    app.route('/trainings/:id').patch(updateTraining)
    app.route('/trainings/:id').delete(removeTraining)
  }
}
