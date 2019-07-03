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
import { Filter, IFilter } from './'

export interface ITraining {
  id: number
  name: string
  description?: string
  downloadURL?: string
  embedURL?: string
  thumbnailURL?: string
  detailURL?: string
  contact?: string
  responsable?: string
  order?: number
  size: string
  type?: string
  duration: string
  trainingOfMonth?: string
  internalViews?: number
  externalViews?: number
  uploadedBy?: string
  createdBy?: string
  isVerified?: boolean
  isRestricted?: boolean
  likes?: number
  comments?: number
  zipPath?: string
  uploadedAt?: Date
  updatedAt?: Date
  createdAt?: Date
  filters?: Array<IFilter>
}

@Entity({
  name: 'Trainings',
})
export class Training implements ITraining {
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

  @Column({ nullable: true })
  public responsable: string

  @Column({ nullable: true })
  public contact: string

  @Column({ nullable: true })
  public duration: string

  @Column({ nullable: true })
  public type: string

  @Column({ nullable: true })
  public order: number

  @Column({ nullable: true })
  public trainingOfMonth: string

  @Column({ default: 0 })
  public size: string

  @Column({ default: 0 })
  public externalViews: number

  @Column({ default: 0 })
  public internalViews: number

  @Column({ default: false })
  public isVerified: boolean

  @Column({ default: true })
  public isRestricted: boolean

  @Column({ default: 0 })
  public comments: number

  @Column({ default: 0 })
  public likes: number

  @Column({ type: 'text', nullable: true })
  public zipPath: string

  @Column({ nullable: true })
  public createdBy: string

  @Column({ nullable: true })
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
  public filters: Array<IFilter>

  @BeforeInsert()
  protected created_at() {
    this.createdAt = new Date()
  }

  @BeforeUpdate()
  protected updated_at() {
    this.updatedAt = new Date()
  }
}
