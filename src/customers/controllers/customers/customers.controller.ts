import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
    constructor(private customerService: CustomersService){}

    // we can use request and response object from express but then we must work with them
    // when returning response
    // most of time this is not neccessary
    // ParseIntPipe is used to validate params
    // @Get(":id")
    // getCustomer(
    //     @Param("id", ParseIntPipe) id: number, 
    //     @Req() req: Request, 
    //     @Res() res: Response){
    //     const customer = this.customerService.getCustomer(id);
    //     if(customer){
    //         res.send(customer);
    //     }else{
    //         res.status(404).send({msg: "Customer not found"});
    //     }
    // }

    // more nestjs way than express of above endpoint
    @Get(":id")
    getCustomer(@Param("id", ParseIntPipe) id: number){
        const customer = this.customerService.getCustomer(id);
        if(customer){
            return customer;
        }else{
            throw new HttpException("Customer not found", HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    getCustomers(){
        return this.customerService.getCustomers();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createCustomer(@Body() customer: CreateCustomerDto)
    {
        this.customerService.createCustomer(customer);
    }
}
