import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import { entities } from './typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CustomersModule, UsersModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: '',
    password: '',
    database: 'nestjs',
    entities: entities,
    // in production this should be false
    // and we should instead use migrations
    synchronize: true
  })]
})
export class AppModule {}
