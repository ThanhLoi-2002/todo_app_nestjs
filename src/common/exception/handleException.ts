import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch() // Catch all exceptions
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    console.error(exception);

    const message: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal server error' };
    
    response.status(status).json({
      statusCode: status,
      status: false,
      message: message.message || 'An error occurred',
      data: null
    });
  }
}
