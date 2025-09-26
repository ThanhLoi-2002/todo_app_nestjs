import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';

// Scope.TRANSIENT để mỗi class sử dụng LoggerService sẽ có instance riêng
// giúp context (tên class) được hiển thị đúng trong log
@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends ConsoleLogger {}
