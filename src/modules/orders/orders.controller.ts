import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AccessGuard, Actions, UseAbility } from 'nest-casl';
import { OrderEntity } from './entities/order.entity';
import { CustomWherePipe2 } from '@providers/custom-where2.pipe';
import { OrderByPipe, SelectPipe } from '@nodeteam/nestjs-pipes';
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { Orders, Prisma } from '@prisma/client';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: 'number', example: 1 })
  @ApiQuery({
    name: 'perPage',
    required: false,
    type: 'number',
    example: 10,
  })
  @ApiQuery({ name: 'where', required: false, type: 'string' })
  @ApiQuery({ name: 'orderBy', required: false, type: 'string' })
  @ApiQuery({
    name: 'include',
    required: false,
    type: 'string',
  })
  @UseGuards(AccessGuard)
  @UseAbility(Actions.read, OrderEntity)
  async findAll(
    @Query('page')
    page?: number,
    @Query('perPage') perPage?: number,
    @Query('where', CustomWherePipe2) where?: Prisma.OrdersWhereInput,
    @Query('orderBy', OrderByPipe)
    orderBy?: Prisma.OrdersOrderByWithRelationInput,
    @Query('include', SelectPipe) include?: Prisma.OrdersInclude,
  ): Promise<PaginatorTypes.PaginatedResult<Orders>> {
    return await this.ordersService.findAll(
      where,
      orderBy,
      page,
      perPage,
      include,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
