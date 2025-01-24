import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
//import { UserRepository } from '@modules/user/user.repository';
import { TokenService } from '@modules/auth/token.service';
import { TokenRepository } from '@modules/auth/token.repository';
import { CaslModule } from 'nest-casl';
import { permissions } from '@modules/auth/auth.permissions';
import { EncryptionService } from './services/encryption.service';
//import { UserService } from '@modules/user/user.service';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [CaslModule.forFeature({ permissions }), PassportModule, UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    //UserService,
    //UserRepository,
    TokenRepository,
    EncryptionService,
    LocalStrategy,
  ],
  exports: [AuthService, TokenService, TokenRepository, EncryptionService],
})
export class AuthModule {}
