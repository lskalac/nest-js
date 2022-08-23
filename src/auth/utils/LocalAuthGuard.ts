import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

// used to login
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext) {
        console.log('Auth Guard enter')
        // calls validate from LocalStrategy (Strategy from Passport)
        const result = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        console.log('Auth Guard before login')
        // calls serializer from SessionSerializer (PassportSerializer from Passport)
        await super.logIn(request);
        console.log('Auth Guard exit')
        return result;
    }
}

// used to authenticate certain routes
@Injectable()
export class AuthenicateGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<Request>();
        return request.isAuthenticated();
    }
}