import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TodoEntity } from 'src/modules/todo/entities/todo.entity';

export enum UserRoleType {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'text', enum: UserRoleType, nullable: false })
  role: UserRoleType;

  @OneToMany(() => TodoEntity, (todo) => todo.user)
  todos: TodoEntity[];

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    if (this.password) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  }

  async validatePassword(plainPassword: string): Promise<boolean> {
    if (!this.password) return false;
    return bcrypt.compare(plainPassword, this.password);
  }
}
