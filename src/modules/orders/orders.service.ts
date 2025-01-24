import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './orders.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrderRepository) {}
  async create(createOrderDto: CreateOrderDto) {
    return await this.orderRepository.create(createOrderDto);
  }

  async findAll(
    where: Prisma.OrdersWhereInput,
    orderBy: Prisma.OrdersOrderByWithRelationInput = {},
    page = 1,
    perPage = 10,
    include: Prisma.OrdersInclude = {},
  ) {
    return await this.orderRepository.findAll(
      where,
      orderBy,
      page,
      perPage,
      include,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return await this.orderRepository.update(id, updateOrderDto);
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
  async rmeoveMany(routeId: number) {
    return this.orderRepository.removeMany(routeId);
  }
}
