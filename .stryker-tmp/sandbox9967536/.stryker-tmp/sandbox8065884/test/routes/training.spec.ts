import * as chai from 'chai'
import chaiHttp = require('chai-http')

import 'mocha'
import App from '../../src/App'
import { Training } from '../../src/models'

chai.use(chaiHttp)

const expect = chai.expect

const training: Training = {
  name: 'Training A',
  description: 'Description Training A',
  downloadURL: 'Training A',
  embedURL: 'Training A',
  thumbnailURL: 'Training A',
  detailURL: 'Training A',
  responsible: 'Training A',
  contact: 'Training A',
  duration: 'Training A',
  type: 'Training A',
  order: 0,
  trainingOfMonth: 'Training A',
  size: 'Training A',
  externalViews: 2,
  internalViews: 1,
  isVerified: true,
  isRestricted: false,
}

describe('trainingRoute', () => {
  it('should respond with HTTP 404 status because there is no training', async () => {
    return chai
      .request(App)
      .get(`/trainings/${training.id}`)
      .then(res => {
        expect(res.status).to.be.equal(404)
      })
  })
  it('should create a new training and retrieve it back', async () => {
    return chai
      .request(App)
      .post('/trainings/')
      .send(training)
      .then(res => {
        expect(res.status).to.be.equal(201)
        expect(res.body.name).to.be.equal(training.name)
      })
  })
  it('should return the training created on the step before', async () => {
    return chai
      .request(App)
      .get(`/trainings/${training.id}`)
      .then(res => {
        expect(res.status).to.be.equal(200)
        expect(res.body.name).to.be.equal(training.name)
      })
  })
  it('should updated the training Training A', async () => {
    training.name = 'Training A Updated'
    training.description = 'Description Updated'
    training.comments = 100
    training.externalViews = 949
    training.contact = 'New Contact'

    return chai
      .request(App)
      .patch(`/trainings/${training.id}`)
      .send(training)
      .then(res => {
        expect(res.status).to.be.equal(204)
      })
  })
  it('should return the training updated on the step before', async () => {
    return chai
      .request(App)
      .get(`/trainings/${training.id}`)
      .then(res => {
        expect(res.status).to.be.equal(200)
        expect(res.body.name).to.be.equal(training.name)
        expect(res.body.description).to.be.equal(training.description)
        expect(res.body.externalViews).to.be.equal(training.externalViews)
        expect(res.body.internalViews).to.be.equal(training.internalViews)
        expect(res.body.isRestricted).to.be.equal(training.isRestricted)
      })
  })
  it('should return 404 because the training does not exist', async () => {
    training.id = 2

    return chai
      .request(App)
      .patch(`/trainings/${training.id}`)
      .send(training)
      .then(res => {
        expect(res.status).to.be.equal(404)
      })
  })
  it('should remove an existent trainings', async () => {
    return chai
      .request(App)
      .del(`/trainings/${training.id}`)
      .then(res => {
        expect(res.status).to.be.equal(204)
      })
  })
  it('should return 404 when it is trying to remove an training because the training does not exist', async () => {
    return chai
      .request(App)
      .del(`/trainings/${training.id}`)
      .then(res => {
        expect(res.status).to.be.equal(404)
      })
  })
})
