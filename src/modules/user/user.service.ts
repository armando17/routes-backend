import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '@modules/user/user.repository';
import { Prisma, User } from '@prisma/client';
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { UpdateUsertDto } from './dto/update-user.dto';
import { EncryptionService } from '@modules/auth/services/encryption.service';
import { CreateUsertDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryptionService: EncryptionService,
  ) {}

  async findById(id: number): Promise<User> {
    return this.userRepository.findById(id);
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  /**
   * @desc Find all users with pagination
   * @param where
   * @param orderBy
   */
  async findAll(
    where: Prisma.UserWhereInput,
    orderBy: Prisma.UserOrderByWithRelationInput = {},
  ): Promise<PaginatorTypes.PaginatedResult<User>> {
    this.logger.log('findAll users');
    const result: any = await this.userRepository.findAll(where, orderBy);

    const processedData = result.data.map((user) => ({
      ...user,
      roles: user['roles'].map((role) => role.Roles.name),
    }));

    return { data: processedData, meta: result['meta'] };
  }

  async update(id: number, updateUsertDto: UpdateUsertDto) {
    if (updateUsertDto.password) {
      const passwordHash = this.encryptionService.encrypt(
        updateUsertDto.password,
      );

      const userCreateInput: Prisma.UserCreateInput = {
        ...updateUsertDto,
        password: passwordHash,
      };
      updateUsertDto = userCreateInput;
    }

    return await this.userRepository.update(id, updateUsertDto);
  }

  async create(createUsertDto: CreateUsertDto) {
    return await this.userRepository.create(createUsertDto);
  }
}
