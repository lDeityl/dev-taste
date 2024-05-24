import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
    constructor() { }
    getHello(): string {
        return 'API created by CircuitBlaze Team';
    }
}
