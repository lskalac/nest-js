import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenicateGuard, LocalAuthGuard } from 'src/auth/utils/LocalAuthGuard';

@Controller('auth')
export class AuthController {
    // it will invoke passport, so execute
    // whole flow from LocalAuth => LocalStrategy => SessionSerializer
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(){
    }

    @UseGuards(AuthenicateGuard)
    @Get('login-status')
    getStatus(@Req() request: Request){
        return request.user;
    }
}
