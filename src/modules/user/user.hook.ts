import { Injectable } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { UserBeforeFilterHook } from 'nest-casl';
import { User } from '@prisma/client';

@Injectable()
export class UserHook implements UserBeforeFilterHook<any> {
  constructor(readonly userService: UserService) {}

  async run(user: User) {
    return {
      ...user,
      ...(await this.userService.findById(user.id)),
    };
  }
}
