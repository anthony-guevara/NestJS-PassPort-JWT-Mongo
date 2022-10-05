import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { firstValueFrom } from 'rxjs';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ProductsModule, UsersModule, HttpModule, DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS', //se pueden usar para conecciones a base de datos, detiene el inciio
      useFactory: async (http: HttpService) => {
        const tasks = await http.get(
          'https://jsonplaceholder.typicode.com/todos',
        );

        const data = await (await firstValueFrom(tasks)).data;

        return data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
