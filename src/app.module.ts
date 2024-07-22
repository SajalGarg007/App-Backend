import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { DataController } from './data/data.controller';
import { DataService } from './data/data.service';

@Module({
  //AuthModule,
  // UsersModule,
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
