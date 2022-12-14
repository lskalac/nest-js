import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/users/types/User';
import { Repository } from 'typeorm';
import { User as UserEntity } from 'src/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/User.dto';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) 
        private readonly userRepository: Repository<UserEntity>) {        
    }

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

    createUser(user: CreateUserDto){
        const password = encodePassword(user.password);
        const newUser = this.userRepository.create({...user, password});
        return this.userRepository.save(newUser);
    }

    findByUsername(username: string){
        return this.userRepository.findOneBy({username});
    }

    findUserById(id: number){
        return this.userRepository.findOneBy({id});
    }
}
