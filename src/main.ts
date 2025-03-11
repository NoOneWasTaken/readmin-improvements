import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AUTH_GUARD } from './auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(AUTH_GUARD);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
