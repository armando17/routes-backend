import ApiBaseResponses from '@decorators/api-base-response.decorator';
import Serialize from '@decorators/serialize.decorator';
import RefreshTokenDto from '@modules/auth/dto/refresh-token.dto';
import { SignInDto } from '@modules/auth/dto/sign-in.dto';
import { TokensEntity } from '@modules/auth/entities/tokens.entity';
import { SkipAuth } from '@modules/auth/skip-auth.guard';
import UserBaseEntity from '@modules/user/entities/user-base.entity';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import {
  AccessGuard,
  Actions,
  CaslUser,
  UseAbility,
  UserProxy,
} from 'nest-casl';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
//import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { TokenService } from './token.service';
//import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@ApiBaseResponses()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @ApiBody({ type: SignUpDto })
  @Serialize(UserBaseEntity)
  @SkipAuth()
  @Post('sign-up')
  create(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authService.singUp(signUpDto);
  }

  @ApiBody({ type: SignInDto })
  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(@Req() req): Promise<Auth.AccessRefreshTokens> {
    const roles = req.user['roles'].map((role) => role.Roles.name);
    return this.tokenService.sign({
      id: req.user.id,
      email: req.user.email,
      roles: roles,
      name: req.user.firstName + ' ' + req.user.lastName,
      username: req.user.username,
    });
  }

  @ApiBody({ type: RefreshTokenDto })
  @SkipAuth()
  @Post('token/refresh')
  refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<Auth.AccessRefreshTokens | void> {
    return this.authService.refreshTokens(refreshTokenDto.refreshToken);
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  @HttpCode(204)
  @UseAbility(Actions.delete, TokensEntity)
  async logout(@CaslUser() userProxy?: UserProxy) {
    const user: any = await userProxy.get();
    return this.authService.logout(user.id, user._meta.accessToken);
  }
}
