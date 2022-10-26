import { Injectable, Inject } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import config from './config';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASKS') private tasks: any,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('MONGO') private database: Db,
  ) {}
  getHello(): string {
    const apiKey = this.configService.apiKey; //this.configServiceice.get('API_KEY');
    const db = this.configService.database.name; //this.configServiceice.get('DATABASE_NAME');
    //console.log(this.tasks);
    return 'Hello World!' + apiKey + db;
  }

  getTasks() {
    const taskCollection = this.database.collection('tasks');
    return taskCollection.find({}).toArray();
  }
}
