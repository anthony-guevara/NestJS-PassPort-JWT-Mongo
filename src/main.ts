import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina los datos que no estan definidos en el DTO
      forbidNonWhitelisted: true, // Devuelve un error si se envia un dato que no esta definido en el DTO
      transformOptions: {
        enableImplicitConversion: true, // Convierte los datos que no son del tipo definido en el DTO
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('/API')
    .setDescription('Platzi Store API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors(); //habilita apertura a cualquir dominio
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
