import { AuthModule } from '@modules/auth/auth.module';
import { AuthGuard } from '@modules/auth/guards/auth.guard';
import { TokenRepository } from '@modules/auth/token.repository';
import { TokenService } from '@modules/auth/token.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaModule } from '@providers/prisma/prisma.module';
import { CaslModule } from 'nest-casl';
import appConfig from 'src/config/app.config';
import swaggerConfig from 'src/config/swagger.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { UserHook } from '@modules/user/user.hook';
import { EncryptionService } from '@modules/auth/services/encryption.service';

import { UserModule } from '@modules/user/user.module';
import { UserRepository } from '@modules/user/user.repository';
import { UserService } from '@modules/user/user.service';

import jwtConfig from 'src/config/jwt.config';
import { Roles } from './app.roles';
import { OrdersModule } from '@modules/orders/orders.module';
import { RoutesModule } from '@modules/routes/routes.module';
import { DriversModule } from '@modules/drivers/drivers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [appConfig, swaggerConfig, jwtConfig],
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
    }),
    CaslModule.forRoot({
      superuserRole: Roles.admin,
      //getUserFromRequest: (request) => request.user,
      //getUserHook: UserHook,
    }),
    AuthModule,
    UserModule,
    OrdersModule,
    RoutesModule,
    DriversModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TokenService,
    JwtService,
    TokenRepository,
    EncryptionService,
    UserService,
    UserRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [UserService, UserRepository],
})
export class AppModule {}
