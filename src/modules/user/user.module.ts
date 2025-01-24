import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from '@modules/user/user.repository';
import { CaslModule } from 'nest-casl';
import { permissions } from '@modules/user/user.permissions';
import { EncryptionService } from '@modules/auth/services/encryption.service';

@Module({
  imports: [CaslModule.forFeature({ permissions })],
  controllers: [UserController],
  providers: [UserService, UserRepository, EncryptionService],
  exports: [UserService, UserRepository],
})
export class UserModule {}
