import { Application, Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Filter } from '../models/Filter'

export class Index {
  public routes(app: Application): void {
    app.route('/index').get(async (req: Request, res: Response) => {
      const manager = getManager()

      const level1 = new Filter()
      level1.name = 'Portfolio'
      await manager.save(level1)

      const level1b = new Filter()
      level1b.name = 'Sales'
      await manager.save(level1b)

      const level2 = new Filter()
      level2.name = 'High-Voltage Solutions'
      level2.parent = level1
      await manager.save(level2)

      const level3 = new Filter()
      level3.name = 'Grid Applications'
      level3.parent = level2
      await manager.save(level3)

      const level4 = new Filter()
      level4.name = 'Smart Grid'
      level4.parent = level3
      await manager.save(level4)

      const trees = await manager.getTreeRepository(Filter).findTrees()

      res.status(200).send({ status: 'success!', data: trees })
    })
  }
}
