import {  Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService) {
        super({
            // if we want that email acts like username
            // usernameField: 'email'
        });
    }

    // by default, nestjs is looking for username
    async validate(username: string, password: string){
        console.log('Local strategy validate')
        const user = await this.authService.validateUser(username, password);
        if(user)
            return user;

        throw new UnauthorizedException();
    }
}