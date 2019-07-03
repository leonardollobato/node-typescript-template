import { NextFunction, Request, Response } from 'express'
import { Training } from '../models'

let trainings: Array<Training> = []

export let getTrainings = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send(trainings)
}

export let getTraining = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  const training = trainings.find(objec => objec.id === id)
  const httpStatusCode = training ? 200 : 404
  return res.status(httpStatusCode).send(training)
}

export let addTraining = (req: Request, res: Response, next: NextFunction) => {
  const training: Training = {
    id: 1,
    name: req.body.name,
    description: req.body.description,
    embedURL: req.body.embedURL,
    downloadURL: req.body.downloadURL,
    thumbnailURL: req.body.thumbnailURL,
  }
  trainings.push(training)
  return res.status(201).send(training)
}

export let updateTraining = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id
  const trainingIndex = trainings.findIndex(item => item.id === id)

  if (trainingIndex === -1) {
    return res.status(404).send()
  }

  const training = trainings[trainingIndex]
  training.name = req.body.name || training.name
  training.description = req.body.description || training.description
  training.embedURL = req.body.embedURL || training.embedURL
  training.downloadURL = req.body.downloadURL || training.downloadURL
  training.thumbnailURL = req.body.thumbnailURL || training.thumbnailURL

  trainings[trainingIndex] = training
  return res.status(204).send()
}

export let removeTraining = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id
  const trainingIndex = trainings.findIndex(item => item.id === id)

  if (trainingIndex === -1) {
    return res.status(404).send()
  }

  trainings = trainings.filter(item => item.id !== id)
  return res.status(204).send()
}
