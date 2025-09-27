import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ResponseMessage } from 'src/common/response/response.interceptor';
import { TodoEntity } from './entities/todo.entity';
import { UserRoleType } from '../user/entities/user.entity';
import { Roles } from '../auth/decorators/role.decorator';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @Roles([UserRoleType.USER])
  @ResponseMessage('Tạo công việc thành công')
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @Request() req: any,
  ): Promise<TodoEntity> {
    return this.todoService.create(createTodoDto, req.user.id);
  }

  @Get()
  @Roles([UserRoleType.USER, UserRoleType.ADMIN])
  async findAll(@Request() req: any): Promise<TodoEntity[]> {
    return this.todoService.findAll(req);
  }

  @Patch(':id')
  @Roles([UserRoleType.USER, UserRoleType.ADMIN])
  @ResponseMessage('Cập nhật thành công')
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Request() req: any,
  ): Promise<TodoEntity> {
    return this.todoService.update(id, updateTodoDto, req);
  }

  @Delete(':id')
  @Roles([UserRoleType.USER, UserRoleType.ADMIN])
  @ResponseMessage('Xóa thành công')
  async remove(@Param('id') id: string): Promise<void> {
    return this.todoService.remove(id);
  }
}
