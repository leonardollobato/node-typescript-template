import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm'
import { ITraining, Training } from './'

export interface IFilter {
  id: number
  name: string
  order?: number
  iconName?: string
  keyId?: number
  updatedAt?: Date
  createdAt?: Date
  children?: Array<IFilter>
  parent?: IFilter
  trainings?: Array<ITraining>
}

@Entity({
  name: 'Filter',
})
@Tree('materialized-path')
export class Filter implements IFilter {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public name: string

  @Column({ nullable: true })
  public order?: number

  @Column({ nullable: true })
  public iconName?: string

  @Column({ nullable: true })
  public keyId?: number

  @TreeChildren()
  public children?: Array<Filter>

  @TreeParent()
  public parent?: Filter

  @CreateDateColumn({ type: 'timestamp', update: true, insert: false })
  public updatedAt?: Date

  @CreateDateColumn({ type: 'timestamp', update: false, insert: true })
  public createdAt?: Date

  // @ManyToMany(type => Training, training => training.filters)
  // public trainings: Array<Training>
}
