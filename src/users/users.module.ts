import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers/customers.controller';
import { ProductsModule } from '../products/products.module';
@Module({
  imports: [ProductsModule],
  controllers: [UsersController, CustomersController],
  providers: [UsersService],
})
export class UsersModule {}
