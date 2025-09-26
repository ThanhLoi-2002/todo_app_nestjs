import { Global, Module } from '@nestjs/common';
import { AppLogger } from './services/logger.service';

const providers = [AppLogger];

@Global()
@Module({
  imports: [],
  providers: [...providers],
  exports: [...providers],
})
export class CommonModule {}
