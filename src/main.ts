import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina los datos que no estan definidos en el DTO
      forbidNonWhitelisted: true, // Devuelve un error si se envia un dato que no esta definido en el DTO
    }),
  );
  await app.listen(3000);
}
bootstrap();
