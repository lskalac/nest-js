import { Injectable } from '@nestjs/common';
import { User } from 'src/users/types/User';

@Injectable()
export class UsersService {
    private users: User[] = [{
        id: 1,
        username: 'test',
        password: 'test123!'
    }];

    getUsers(){     
        return this.users;
    }

    getByUsername(username: string){
        return this.users.find(x => x.username === username);
    }

    getUserById(id: number){
        return this.users.find(x => x.id === id);
    }
}
