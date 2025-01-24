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
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AccessGuard, Actions, UseAbility } from 'nest-casl';
import { RouteEntity } from './entities/route.entity';
import { Prisma } from '@prisma/client';
import { CustomWherePipe2 } from '@providers/custom-where2.pipe';
import { OrderByPipe, SelectPipe } from '@nodeteam/nestjs-pipes';
import { OrdersService } from '@modules/orders/orders.service';
@ApiTags('Routes')
@ApiBearerAuth()
@Controller('routes')
export class RoutesController {
  constructor(
    private readonly routesService: RoutesService,
    private readonly ordersService: OrdersService,
  ) {}

  @Post()
  async create(@Body() createRouteDto: CreateRouteDto) {
    const orders = createRouteDto.orders;
    delete createRouteDto.orders;
    const result = await this.routesService.create(createRouteDto);

    for (const order of orders) {
      await this.ordersService.create(order);
    }
    return result;
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
  @UseAbility(Actions.read, RouteEntity)
  async findAll(
    @Query('page')
    page?: number,
    @Query('perPage') perPage?: number,
    @Query('where', CustomWherePipe2) where?: Prisma.RoutesWhereInput,
    @Query('orderBy', OrderByPipe)
    orderBy?: Prisma.RoutesOrderByWithRelationInput,
    @Query('include', SelectPipe) include?: Prisma.RoutesInclude,
  ) {
    return this.routesService.findAll(where, orderBy, page, perPage, include);
  }

  @Get(':id/external')
  @UseGuards(AccessGuard)
  @UseAbility(Actions.read, RouteEntity)
  async findOneExternal(@Param('id') id: number) {
    const result = await this.routesService.findOneExternal(id);

    return result;
  }

  @Get(':id')
  @UseGuards(AccessGuard)
  @UseAbility(Actions.read, RouteEntity)
  async findOne(@Param('id') id: number) {
    return await this.routesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRouteDto: UpdateRouteDto,
  ) {
    if (updateRouteDto.orders) {
      const orders = updateRouteDto.orders;
      delete updateRouteDto.orders;
      for (const order of orders) {
        await this.ordersService.update(order.id, order);
      }
    }
    return await this.routesService.update(id, updateRouteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.ordersService.rmeoveMany(id);
    return await this.routesService.remove(id);
  }
}
