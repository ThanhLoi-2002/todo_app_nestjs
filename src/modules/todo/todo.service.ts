import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { UserRoleType } from '../user/entities/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async create(dto: CreateTodoDto, userId: string): Promise<TodoEntity> {
    const todo = this.todoRepository.create({
      ...dto,
      userId
    });
    return this.todoRepository.save(todo);
  }

  async findAll(req: any): Promise<TodoEntity[]> {
    // lấy tất cả todo nếu là admin, nếu là user thì chỉ lấy todo của user
    if(req.user.role === UserRoleType.USER){
      return this.todoRepository.find({ where: { userId: req.user.id } });
    }
    return this.todoRepository.find({ relations: ['user'] });
  }

  async findOneById(id: string, relations?: string[]): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({
      where: { id },
      relations,
    });
    if (!todo) {
      throw new NotFoundException(`Không tìm thấy công việc với id: ${id}`);
    }
    return todo;
  }

  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
    req: any,
  ): Promise<TodoEntity> {
    const todo = await this.findOneById(id);
    const updatedTodo = Object.assign(todo, updateTodoDto);

    if (req.user.role === 'USER') {
      return this.todoRepository.save(updatedTodo);
    } else {
      await this.todoRepository.save(updatedTodo);
      return this.findOneById(id, ['user']);
    }
  }

  async remove(id: string) {
    const todo = await this.findOneById(id);
    await this.todoRepository.delete(todo.id);
  }
}
