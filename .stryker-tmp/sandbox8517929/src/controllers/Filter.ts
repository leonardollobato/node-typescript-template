import { NextFunction, Request, Response } from 'express'
import { Filter, IFilter } from '../models'

let filters: Array<IFilter> = []

export let getFilters = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send(filters)
}

export let getFilter = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  const filter = filters.find(objec => objec.id === id)
  const httpStatusCode = filter ? 200 : 404
  return res.status(httpStatusCode).send(filter)
}

export let addFilter = (req: Request, res: Response, next: NextFunction) => {
  const filter: IFilter = {
    id: 1,
    name: req.body.name,
    order: req.body.order,
    keyId: req.body.keyId,
    parent: req.body.parent,
    iconName: req.body.iconName,
  }
  filters.push(filter)
  return res.status(201).send(filter)
}

export let updateFilter = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  const filterIndex = filters.findIndex(item => item.id === id)

  if (filterIndex === -1) {
    return res.status(404).send()
  }

  const filter = filters[filterIndex]
  filter.name = req.body.name || filter.name
  filter.order = req.body.order || filter.order
  filter.iconName = req.body.iconName || filter.iconName
  filter.keyId = req.body.keyId || filter.keyId
  filter.parent = req.body.parent || filter.parent

  filter[filterIndex] = filter
  return res.status(204).send()
}

export let removeFilter = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  const filterIndex = filters.findIndex(item => item.id === id)

  if (filterIndex === -1) {
    return res.status(404).send()
  }

  filters = filters.filter(item => item.id !== id)
  return res.status(204).send()
}
