import { PrismaService } from '@providers/prisma';
import { Injectable } from '@nestjs/common';
import { paginator } from '@nodeteam/nestjs-prisma-pagination';
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { Prisma, Routes } from '@prisma/client';

@Injectable()
export class RouteRepository {
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

  findById(id: number): Promise<Routes> {
    return this.prisma.routes.findUnique({
      where: { id },
    });
  }

  /**
   * @desc Find a routes by params
   * @param params Prisma.RoutesFindFirstArgs
   * @returns Promise<Routes | null>
   *       If the routes is not found, return null
   */
  async findOne(params: Prisma.RoutesFindFirstArgs): Promise<Routes | null> {
    return this.prisma.routes.findFirst(params);
  }

  /**
   * @desc Create a new routes
   * @param data Prisma.RoutesCreateInput
   * @returns Promise<Routes>
   */
  async create(data: Prisma.RoutesCreateInput): Promise<Routes> {
    return this.prisma.routes.create({
      data,
    });
  }

  /**
   * @desc Find all routes with pagination
   * @param where Prisma.RoutesWhereInput
   * @param orderBy Prisma.RoutesOrderByWithRelationInput
   * @returns Promise<PaginatorTypes.PaginatedResult<Routes>>
   */
  async findAll(
    where: Prisma.RoutesWhereInput,
    orderBy: Prisma.RoutesOrderByWithRelationInput,
    page: number = 1,
    perPage: number = 10,
    include: Prisma.RoutesInclude = {},
  ): Promise<PaginatorTypes.PaginatedResult<Routes>> {
    return this.paginate(
      this.prisma.routes,
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

  async update(id: number, data: Prisma.RoutesCreateInput): Promise<Routes> {
    return this.prisma.routes.update({
      where: { id: id },
      data,
    });
  }

  async remove(id: number): Promise<any> {
    return await this.prisma.routes.delete({ where: { id: id } });
  }
}
