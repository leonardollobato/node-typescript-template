import { NextFunction, Request, Response } from 'express'
import { User } from '../models'

let users: Array<User> = []

export let get = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  const user = users.find(objec => objec.id === id)
  const httpStatusCode = user ? 200 : 404
  return res.status(httpStatusCode).send(user)
}

export let add = (req: Request, res: Response, next: NextFunction) => {
  const user: User = {
    id: 1,
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  }
  users.push(user)
  return res.status(201).send(user)
}

export let update = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  const userIndex = users.findIndex(item => item.id === id)

  if (userIndex === -1) {
    return res.status(404).send()
  }

  const user = users[userIndex]
  user.username = req.body.username || user.username
  user.firstname = req.body.firstname || user.firstname
  user.lastname = req.body.lastname || user.lastname
  user.email = req.body.email || user.email
  user.password = req.body.password || user.password

  users[userIndex] = user
  return res.status(204).send()
}

export let remove = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  const userIndex = users.findIndex(item => item.id === id)

  if (userIndex === -1) {
    return res.status(404).send()
  }

  users = users.filter(item => item.id !== id)
  return res.status(204).send()
}
