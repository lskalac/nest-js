import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
    private users = [{
        id: 1,
        name: "joe"
    }, {
        id: 2,
        name: "jane"
    }];

    getCustomer(id: number){
        return this.users.find(x => x.id === id);
    }
}
