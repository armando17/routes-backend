import ApiBaseResponses from '@decorators/api-base-response.decorator';
import ApiOkBaseResponse from '@decorators/api-ok-base-response.decorator';
import Serialize from '@decorators/serialize.decorator';
import UserBaseEntity from '@modules/user/entities/user-base.entity';
import UserEntity from '@modules/user/entities/user.entity';
import { UserHook } from '@modules/user/user.hook';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { OrderByPipe, WherePipe } from '@nodeteam/nestjs-pipes';
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { Prisma, User } from '@prisma/client';
import {
  AccessGuard,
  Actions,
  CaslConditions,
  CaslSubject,
  //CaslUser,
  ConditionsProxy,
  SubjectProxy,
  UseAbility,
  //UserProxy,
} from 'nest-casl';
import { UpdateUsertDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { CreateUsertDto } from './dto/create-user.dto';
import { SkipAuth } from '@modules/auth/skip-auth.guard';

@ApiTags('Users')
@ApiBearerAuth()
@ApiExtraModels(UserBaseEntity)
@ApiBaseResponses()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiQuery({ name: 'where', required: false, type: 'string' })
  @ApiQuery({ name: 'orderBy', required: false, type: 'string' })
  @ApiOkBaseResponse({ dto: UserBaseEntity, isArray: true })
  @UseGuards(AccessGuard)
  @Serialize(UserBaseEntity)
  @UseAbility(Actions.read, UserEntity)
  async findAll(
    @Query('where', WherePipe) where?: Prisma.UserWhereInput,
    @Query('orderBy', OrderByPipe)
    orderBy?: Prisma.UserOrderByWithRelationInput,
  ): Promise<PaginatorTypes.PaginatedResult<User>> {
    return this.userService.findAll(where, orderBy);
  }

  /* @Get('me')
  @ApiOkBaseResponse({ dto: UserBaseEntity })
  @UseGuards(AccessGuard)
  @Serialize(UserBaseEntity)
  @UseAbility(Actions.read, UserEntity)
  async me(
    @CaslUser() userProxy?: UserProxy<User>,
    //@CaslConditions() conditions?: ConditionsProxy,
    @Query('where', WherePipe) where?: Prisma.UserWhereInput,
  ) {
    const user = await userProxy.get();
    where = { ...where, id: user.id };
    return await this.userService.findOne(where);
  } */

  @Patch('me')
  @UseGuards(AccessGuard)
  @Serialize(UserBaseEntity)
  @UseAbility(Actions.update, UserEntity, UserHook)
  async updateUser(
    //@CaslUser() userProxy?: UserProxy<User>,
    @CaslConditions() conditions?: ConditionsProxy,
    @CaslSubject() subjectProxy?: SubjectProxy<User>,
  ): Promise<User> {
    //const tokenUser = await userProxy.get();
    const subject = await subjectProxy.get();
    return subject;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUsertDto: UpdateUsertDto,
  ) {
    return await this.userService.update(id, updateUsertDto);
  }

  @Post('public')
  @SkipAuth()
  async create(@Body() createUsertDto: CreateUsertDto) {
    const dataUsers = await this.userService.findAll({
      email: createUsertDto.email,
    });
    if (dataUsers.meta.total > 0) {
      return dataUsers.data[0];
    }
    return await this.userService.create(createUsertDto);
  }
}
