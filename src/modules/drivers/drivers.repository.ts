import { PrismaService } from '@providers/prisma';
import { Injectable } from '@nestjs/common';
import { paginator } from '@nodeteam/nestjs-prisma-pagination';
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { Prisma, Drivers } from '@prisma/client';

@Injectable()
export class DriverRepository {
  private readonly paginate: PaginatorTypes.PaginateFunction;

  constructor(private prisma: PrismaService) {
    /**
     * @desc Create a paginate function
     * @param model
     * @param options
     * @returns Promise<PaginatorTypes.PaginatedResult<T>>
     */
    this.paginate = paginator({
      page: 1,
      perPage: 10,
    });
  }

  findById(id: number): Promise<Drivers> {
    return this.prisma.drivers.findUnique({
      where: { id },
    });
  }

  /**
   * @desc Find a drivers by params
   * @param params Prisma.DriversFindFirstArgs
   * @returns Promise<Drivers | null>
   *       If the drivers is not found, return null
   */
  async findOne(params: Prisma.DriversFindFirstArgs): Promise<Drivers | null> {
    return this.prisma.drivers.findFirst(params);
  }

  /**
   * @desc Create a new drivers
   * @param data Prisma.DriversCreateInput
   * @returns Promise<Drivers>
   */
  async create(data: Prisma.DriversCreateInput): Promise<Drivers> {
    return this.prisma.drivers.create({
      data,
    });
  }

  /**
   * @desc Find all drivers with pagination
   * @param where Prisma.DriversWhereInput
   * @param orderBy Prisma.DriversOrderByWithRelationInput
   * @returns Promise<PaginatorTypes.PaginatedResult<Drivers>>
   */
  async findAll(
    where: Prisma.DriversWhereInput,
    orderBy: Prisma.DriversOrderByWithRelationInput,
    page: number = 1,
    perPage: number = 10,
    include: Prisma.DriversInclude = {},
  ): Promise<PaginatorTypes.PaginatedResult<Drivers>> {
    return this.paginate(
      this.prisma.drivers,
      {
        where,
        orderBy,
        include,
      },
      {
        page: page,
        perPage: perPage,
      },
    );
  }

  async update(id: number, data: Prisma.DriversCreateInput): Promise<Drivers> {
    return this.prisma.drivers.update({
      where: { id: id },
      data,
    });
  }
}
