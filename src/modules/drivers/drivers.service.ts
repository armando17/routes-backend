import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Prisma } from '@prisma/client';
import { DriverRepository } from './drivers.repository';

@Injectable()
export class DriversService {
  constructor(private readonly driverRepository: DriverRepository) {}
  create(createDriverDto: CreateDriverDto) {
    return 'This action adds a new driver';
  }

  async findAll(
    where: Prisma.DriversWhereInput,
    orderBy: Prisma.DriversOrderByWithRelationInput = {},
    page = 1,
    perPage = 10,
    include: Prisma.DriversInclude = {},
  ) {
    return await this.driverRepository.findAll(
      where,
      orderBy,
      page,
      perPage,
      include,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} driver`;
  }

  update(id: number, updateDriverDto: UpdateDriverDto) {
    return `This action updates a #${id} driver`;
  }

  remove(id: number) {
    return `This action removes a #${id} driver`;
  }
}
