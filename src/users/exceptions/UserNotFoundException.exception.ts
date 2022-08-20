import { HttpException, HttpStatus } from "@nestjs/common";

// must extend httpexception
export class UserNotFoundException extends HttpException {
    constructor(msg?: string, status?: HttpStatus) {
        super(msg || 'User not found', status || HttpStatus.NOT_FOUND);      
    }
}