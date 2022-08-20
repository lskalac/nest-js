import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CustomersController } from './controllers/customers/customers.controller';
import { ValidateCustomerMiddleware } from './middlewares/validate-customer.middleware';
import { CustomersService } from './services/customers/customers.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService]
})
// configuring and applying middlewares:
export class CustomersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    // we can pass and a function here instead of class (so we can implement middleware as 
    // a function too) but by nest is recommended class way
    consumer.apply(ValidateCustomerMiddleware, (req: Request, res: Response, next: NextFunction) => {
      console.log('I am second middleware');
      next();
    })
    .forRoutes({
      path: 'customers/:id',
      method: RequestMethod.GET
    });
  }
}
