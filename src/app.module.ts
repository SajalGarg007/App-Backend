import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { DataController } from './data/data.controller';
import { DataService } from './data/data.service';

@Module({
  imports: [ DatabaseModule, 
    ConfigModule.forRoot({
      isGlobal: true
  }),

],
  controllers: [AppController, DataController],
  providers: [AppService,DataService],

})
export class AppModule {

}
