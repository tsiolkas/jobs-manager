if (!process.env.DEPLOY_ENV || process.env.DEPLOY_ENV == 'local') {
  require('dotenv').config();
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
