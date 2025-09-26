import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

export enum TodoStatusType {
  PENDING = 'pending',
  DONE = 'done',
}

@Entity()
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    default: TodoStatusType.PENDING,
    type: 'text',
    enum: TodoStatusType,
  })
  status: TodoStatusType;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.todos)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
