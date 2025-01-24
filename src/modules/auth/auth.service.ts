import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UserRepository } from '@modules/user/user.repository';
import {
  INVALID_CREDENTIALS,
  NOT_FOUND,
  USER_CONFLICT,
} from '@constants/errors.constants';
import { Prisma, User } from '@prisma/client';
import { SignInDto } from '@modules/auth/dto/sign-in.dto';
import { TokenService } from '@modules/auth/token.service';
import { EncryptionService } from './services/encryption.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly encryptionService: EncryptionService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(
    usernameOrEmail: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user: User = await this.userRepository.findOne({
      where: {
        email: usernameOrEmail,
      },
      include: {
        roles: {
          include: { Roles: true },
        },
      },
    });
    if (!user) return null;
    const decryptedPassword = this.encryptionService.decrypt(user.password);
    if (password === decryptedPassword) {
      return user;
    }
    return null;
  }

  /**
   * @desc Create a new user
   * @param signUpDto
   * @returns Promise<User> - Created user
   * @throws ConflictException - User with this email or phone already exists
   */
  async singUp(signUpDto: SignUpDto): Promise<User> {
    const testUser: User = await this.userRepository.findOne({
      where: { email: signUpDto.email },
    });

    if (testUser) {
      // 409001: User with this email or phone already exists
      throw new ConflictException(USER_CONFLICT);
    }

    const passwordHash = this.encryptionService.encrypt(signUpDto.password);

    const userCreateInput: Prisma.UserCreateInput = {
      ...signUpDto,
      password: passwordHash,
    };

    return await this.userRepository.create(userCreateInput);
  }

  /**
   * @desc Sign in a user
   * @returns Auth.AccessRefreshTokens - Access and refresh tokens
   * @throws NotFoundException - User not found
   * @throws UnauthorizedException - Invalid credentials
   * @param signInDto - User credentials
   */
  async signIn(signInDto: SignInDto): Promise<Auth.AccessRefreshTokens> {
    const testUser: User = await this.userRepository.findOne({
      where: {
        email: signInDto.email,
      },
      include: {
        roles: true,
      },
      select: {
        id: true,
        email: true,
        password: true,
        roles: true,
      },
    });

    if (!testUser) {
      // 404001: User not found
      throw new NotFoundException(NOT_FOUND);
    }

    if (
      !(await this.tokenService.isPasswordCorrect(
        signInDto.password,
        testUser.password,
      ))
    ) {
      // 401001: Invalid credentials
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }

    return this.tokenService.sign({
      id: testUser.id,
      email: testUser.email,
      roles: testUser['roles'],
    });
  }

  refreshTokens(
    refreshToken: string,
  ): Promise<Auth.AccessRefreshTokens | void> {
    return this.tokenService.refreshTokens(refreshToken);
  }

  logout(userId: number, accessToken: string): Promise<void> {
    return this.tokenService.logout(userId, accessToken);
  }

  async validateToken(token: string) {
    if (!token) {
      throw new UnauthorizedException();
    }

    const tokenWithList =
      await this.tokenService.getAccessTokenFromWhitelist(token);

    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('jwt.accessToken'),
      });
      return user;
    } catch {
      if (tokenWithList) {
        await this.tokenService.logout(
          tokenWithList.userId,
          tokenWithList.accessToken,
        );
      }

      throw new UnauthorizedException();
    }
  }
}
