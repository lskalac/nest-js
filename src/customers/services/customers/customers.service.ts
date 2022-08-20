import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { Customer } from 'src/customers/types/Customer';

@Injectable()
export class CustomersService {
    private users: Customer[] = [{
        id: 1,
        email: "",
        name: "joe"
    }, {
        id: 2,
        email: "",
        name: "jane"
    }];

    getCustomer(id: number){
        return this.users.find(x => x.id === id);
    }

    getCustomers(){
        return this.users;
    }

    createCustomer(customer: CreateCustomerDto){
        this.users.push(customer);
    }
}
