import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SerializedUser, User } from 'src/users/types/User';

@Injectable()
export class UsersService {
    private users: User[] = [{
        username: 'test',
        password: 'test123!'
    }];

    getUsers(){     
        return this.users;
    }

    getByUsername(username: string){
        return this.users.find(x => x.username === username);
    }
}
