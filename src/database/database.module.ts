import { Module, Global } from '@nestjs/common';
const API_KEY = 'ENV';
const API_KEY_PROD = 'PROD';
@Global() //se puede usar en cualquier parte de la aplicacion sin importar el modulo
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
