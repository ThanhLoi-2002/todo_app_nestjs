import { IsOptional, IsString } from 'class-validator';
import { TodoStatusType } from '../entities/todo.entity';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: TodoStatusType;
}
