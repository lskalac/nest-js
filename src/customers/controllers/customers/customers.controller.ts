import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Req, Res } from '@nestjs/common';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
    constructor(private customerService: CustomersService){}

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
    getCustomer(
        @Param("id", ParseIntPipe) id: number){
        const customer = this.customerService.getCustomer(id);
        if(customer){
            return customer;
        }else{
            throw new HttpException("Customer not found", HttpStatus.BAD_REQUEST);
        }
    }
}
