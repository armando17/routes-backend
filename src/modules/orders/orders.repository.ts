import { PrismaService } from '@providers/prisma';
import { Injectable } from '@nestjs/common';
import { paginator } from '@nodeteam/nestjs-prisma-pagination';
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { Prisma, Orders } from '@prisma/client';

@Injectable()
export class OrderRepository {
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

  findById(id: number): Promise<Orders> {
    return this.prisma.orders.findUnique({
      where: { id },
    });
  }

  /**
   * @desc Find a orders by params
   * @param params Prisma.OrdersFindFirstArgs
   * @returns Promise<Orders | null>
   *       If the orders is not found, return null
   */
  async findOne(params: Prisma.OrdersFindFirstArgs): Promise<Orders | null> {
    return this.prisma.orders.findFirst(params);
  }

  /**
   * @desc Create a new orders
   * @param data Prisma.OrdersCreateInput
   * @returns Promise<Orders>
   */
  async create(data: Prisma.OrdersCreateInput): Promise<Orders> {
    return this.prisma.orders.create({
      data,
    });
  }

  /**
   * @desc Find all orders with pagination
   * @param where Prisma.OrdersWhereInput
   * @param orderBy Prisma.OrdersOrderByWithRelationInput
   * @returns Promise<PaginatorTypes.PaginatedResult<Orders>>
   */
  async findAll(
    where: Prisma.OrdersWhereInput,
    orderBy: Prisma.OrdersOrderByWithRelationInput,
    page: number = 1,
    perPage: number = 10,
    include: Prisma.OrdersInclude = {},
  ): Promise<PaginatorTypes.PaginatedResult<Orders>> {
    return this.paginate(
      this.prisma.orders,
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

  async update(id: number, data: Prisma.OrdersCreateInput): Promise<Orders> {
    return this.prisma.orders.update({
      where: { id: id },
      data,
    });
  }

  async removeMany(id: number): Promise<any> {
    return await this.prisma.orders.deleteMany({ where: { routeId: id } });
  }
}
