import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://scerutti:1234@taskdb.oegops7.mongodb.net/',
    ),
    TasksModule,
  ],
})
export class AppModule {}
