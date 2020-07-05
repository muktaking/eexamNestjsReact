import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TasksModule } from "./tasks/tasks.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { CategoriesModule } from "./categories/categories.module";
import { MulterModule } from "@nestjs/platform-express";
import { QuestionsModule } from './questions/questions.module';
import { ExamsModule } from './exams/exams.module';
import { PostexamsModule } from './postexams/postexams.module';
import * as config from "config";

const dbConfig = config.get("db");

@Module({
  imports: [
    ConfigModule.forRoot(),
    TasksModule,
    MongooseModule.forRoot(
      `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`
    ),
    MulterModule.register({
      dest: "./uploads"
    }),
    AuthModule,
    UsersModule,
    CategoriesModule,
    QuestionsModule,
    ExamsModule,
    PostexamsModule
  ]
})
export class AppModule {}
