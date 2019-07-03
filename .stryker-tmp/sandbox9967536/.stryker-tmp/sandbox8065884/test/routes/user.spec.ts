import * as chai from 'chai'
import chaiHttp = require('chai-http')
import 'mocha'
import App from '../../src/App'
import { User } from '../../src/models'

chai.use(chaiHttp)

const expect = chai.expect

const user: User = {
  id: 1,
  email: 'jhon@myemail.com',
  firstname: 'John',
  lastname: 'Doe',
  password: 'password',
  username: 'JohnDoe',
}

describe('userRoute', () => {
  it('should respond with HTTP 404 status because there is no user', async () => {
    return chai
      .request(App)
      .get(`/users/${user.id}`)
      .then(res => {
        expect(res.status).to.be.equal(404)
      })
  })
  it('should create a new user and retrieve it back', async () => {
    return chai
      .request(App)
      .post('/users/')
      .send(user)
      .then(res => {
        expect(res.status).to.be.equal(201)
        expect(res.body.username).to.be.equal(user.username)
      })
  })
  it('should return the user created on the step before', async () => {
    return chai
      .request(App)
      .get(`/users/${user.id}`)
      .then(res => {
        expect(res.status).to.be.equal(200)
        expect(res.body.username).to.be.equal(user.username)
      })
  })
  it('should updated the user Jhon', async () => {
    user.username = 'Jhon Updated'
    user.firstname = 'Jhon Updated'
    user.lastname = 'Doe Updated'
    user.email = 'jhon@myemail_updated.com'
    user.password = 'password Updated'

    return chai
      .request(App)
      .patch(`/users/${user.id}`)
      .send(user)
      .then(res => {
        expect(res.status).to.be.equal(204)
      })
  })
  it('should return the user updated on the step before', async () => {
    return chai
      .request(App)
      .get(`/users/${user.id}`)
      .then(res => {
        expect(res.status).to.be.equal(200)
        expect(res.body.username).to.be.equal(user.username)
        expect(res.body.firstName).to.be.equal(user.firstname)
        expect(res.body.lastName).to.be.equal(user.lastname)
        expect(res.body.email).to.be.equal(user.email)
        expect(res.body.password).to.be.equal(user.password)
      })
  })
  it('should return 404 because the user does not exist', async () => {
    user.id = 2

    return chai
      .request(App)
      .patch(`/users/${user.id}`)
      .send(user)
      .then(res => {
        expect(res.status).to.be.equal(404)
      })
  })
  it('should remove an existent user', async () => {
    return chai
      .request(App)
      .del(`/users/${user.id}`)
      .then(res => {
        expect(res.status).to.be.equal(204)
      })
  })
  it('should return 404 when it is trying to remove an user because the user does not exist', async () => {
    return chai
      .request(App)
      .del(`/users/${user.id}`)
      .then(res => {
        expect(res.status).to.be.equal(404)
      })
  })
})
