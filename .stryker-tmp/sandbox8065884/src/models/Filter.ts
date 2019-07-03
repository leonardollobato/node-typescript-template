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
import { Training } from './Training'

@Entity({
  name: 'Filter',
})
@Tree('materialized-path')
export class Filter {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public name: string

  @Column({ nullable: true })
  public order: number

  @Column({ nullable: true })
  public iconName: string

  @Column({ nullable: true })
  public keyId: number

  @TreeChildren()
  public children: Array<Filter>

  @TreeParent()
  public parent: Filter

  @CreateDateColumn({ type: 'timestamp' })
  public updatedAt: Date

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date

  @ManyToMany(type => Training, training => training.filters)
  public filters: Array<Filter>

  @BeforeInsert()
  protected created_at() {
    this.createdAt = new Date()
  }

  @BeforeUpdate()
  protected updated_at() {
    this.updatedAt = new Date()
  }
}
