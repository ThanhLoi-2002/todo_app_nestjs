import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TodoStatusType } from '../entities/todo.entity';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status: TodoStatusType = TodoStatusType.PENDING;
}
