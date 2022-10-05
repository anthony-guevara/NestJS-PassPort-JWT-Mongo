import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASKS') private tasks: any,
    private configService: ConfigService,
  ) {}
  getHello(): string {
    const apiKey = this.configService.get('API_KEY');
    const db = this.configService.get('DATABASE_NAME');
    //console.log(this.tasks);
    return 'Hello World!' + apiKey + db;
  }
}
