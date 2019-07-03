import * as chai from 'chai'
import chaiHttp = require('chai-http')

import 'mocha'
import App from '../../src/App'
import { Filter } from '../../src/models'

chai.use(chaiHttp)

const expect = chai.expect

const filter: Filter = {
  id: 1,
  name: 'filter A',
  keyId: 95858585,
  order: 0,
  iconName: 'default',
}

describe('filterRoute', () => {
  it('should respond with HTTP 404 status because there is no filter', async () => {
    return chai
      .request(App)
      .get(`/filters/${filter.id}`)
      .then(res => {
        expect(res.status).to.be.equal(404)
      })
  })
  it('should create a new filter and retrieve it back', async () => {
    return chai
      .request(App)
      .post('/filters/')
      .send(filter)
      .then(res => {
        expect(res.status).to.be.equal(201)
        expect(res.body.name).to.be.equal(filter.name)
      })
  })
  it('should return the filter created on the step before', async () => {
    return chai
      .request(App)
      .get(`/filters/${filter.id}`)
      .then(res => {
        expect(res.status).to.be.equal(200)
        expect(res.body.name).to.be.equal(filter.name)
      })
  })
  it('should updated the filter filter A', async () => {
    filter.name = 'filter A Updated'

    return chai
      .request(App)
      .patch(`/filters/${filter.id}`)
      .send(filter)
      .then(res => {
        expect(res.status).to.be.equal(204)
      })
  })
  it('should return the filter updated on the step before', async () => {
    return chai
      .request(App)
      .get(`/filters/${filter.id}`)
      .then(res => {
        expect(res.status).to.be.equal(200)
        expect(res.body.name).to.be.equal(filter.name)
        expect(res.body.order).to.be.equal(filter.order)
        expect(res.body.keyId).to.be.equal(filter.keyId)
      })
  })
  it('should return 404 because the filter does not exist', async () => {
    filter.id = 2

    return chai
      .request(App)
      .patch(`/filters/${filter.id}`)
      .send(filter)
      .then(res => {
        expect(res.status).to.be.equal(404)
      })
  })
  it('should remove an existent filters', async () => {
    return chai
      .request(App)
      .del(`/filters/${filter.id}`)
      .then(res => {
        expect(res.status).to.be.equal(204)
      })
  })
  it('should return 404 when it is trying to remove an filter because the filter does not exist', async () => {
    return chai
      .request(App)
      .del(`/filters/${filter.id}`)
      .then(res => {
        expect(res.status).to.be.equal(404)
      })
  })
})
