import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { UsersService } from 'src/users/services/users/users.service';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { LocalStrategy } from './utils/LocalStrategy';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    PassportModule.register({
      session: true
    })],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, SessionSerializer]
})
export class AuthModule {}
