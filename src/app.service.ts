import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { messasge: "Welcome to Carrichh's Road to Rich!" };
  }
}
