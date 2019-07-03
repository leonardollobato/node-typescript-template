import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({
  name: 'User',
})
export class User {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ nullable: true })
  public username: string

  @Column({ unique: true })
  public email: string

  @Column()
  public password: string

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  public emailVerifiedAt: Date

  @CreateDateColumn({ type: 'timestamp' })
  public updatedAt: Date

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date

  @BeforeInsert()
  protected created_at() {
    this.createdAt = new Date()
  }

  @BeforeUpdate()
  protected updated_at() {
    this.updatedAt = new Date()
  }
}
