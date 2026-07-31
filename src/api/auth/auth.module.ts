import { Module, type MiddlewareConsumer, type NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from '../../core/auth/services/auth.service';
import { AuthMiddleware } from '../../core/auth/middlewares/auth.middleware';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'auth/me', method: RequestMethod.GET },
        { path: 'auth/logout', method: RequestMethod.POST }
      );
  }
}
