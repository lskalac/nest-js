import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/typeorm";
import { UsersService } from "src/users/services/users/users.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly userService: UsersService) {
        super();
    }

    // what we specify here in done (user) that will determine
    // what will deserialize expect
    serializeUser(user: User, done: (err, user: User) => void) {
        // tells passport how to serialize user to session
        // if we later referencing req.user it will give us everything from there
       console.log('session serializer')
        done(null, user);
    }

    async deserializeUser(user: User, done: (err, user: User) => void) {
        // opposite - we are taking the data that is serialized in the session
        // and store the actual db user into req.user
        console.log('session deserializer')
        const dbUser = await this.userService.findUserById(user.id);
        return dbUser ? done(null, dbUser) : done(null, null);
    }
}