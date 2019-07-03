import {
  addTraining,
  getTraining,
  getTrainings,
  removeTraining,
  updateTraining,
} from '../controllers'

export class TrainingRoute {
  public routes(App): void {
    App.route('/trainings/:id').get(getTraining)
    App.route('/trainings').get(getTrainings)
    App.route('/trainings').post(addTraining)
    App.route('/trainings/:id').patch(updateTraining)
    App.route('/trainings/:id').delete(removeTraining)
  }
}
