import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Filter } from './Filter'

@Entity({
  name: 'Trainings',
})
export class Training {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public name: string

  @Column({ type: 'text' })
  public description: string

  @Column({ type: 'text' })
  public downloadURL: string

  @Column({ type: 'text' })
  public embedURL: string

  @Column({ type: 'text' })
  public thumbnailURL: string

  @Column({ type: 'text' })
  public detailURL: string

  @Column()
  public responsible: string

  @Column()
  public contact: string

  @Column()
  public duration: string

  @Column()
  public type: string

  @Column()
  public order: number

  @Column()
  public trainingOfMonth: string

  @Column()
  public size: string

  @Column()
  public externalViews: number

  @Column()
  public internalViews: number

  @Column()
  public isVerified: boolean

  @Column()
  public restricted: boolean

  @Column()
  public comments: number

  @Column()
  public likes: number

  @Column({ type: 'text' })
  public zipPath: string

  @Column()
  public createdBy: string

  @Column()
  public uploadedBy: string

  @CreateDateColumn({ type: 'timestamp' })
  public uploadedAt: Date

  @CreateDateColumn({ type: 'timestamp' })
  public updatedAt: Date

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date

  @ManyToMany(type => Filter)
  @JoinTable({
    name: 'TrainingFilter',
  })
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
