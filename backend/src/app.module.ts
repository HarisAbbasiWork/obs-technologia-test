// app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSchema } from './schema/user.schema';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';
import { JwtMiddleware } from './jwt.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL,
      { dbName: 'obstechnology' }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ], 
  controllers: [AppController,UserController],
  providers: [AppService,UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        'user/login',
        'user/signup',
      )
      .forRoutes(UserController)
  }
}