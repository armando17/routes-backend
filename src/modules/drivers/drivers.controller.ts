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
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AccessGuard, Actions, UseAbility } from 'nest-casl';
import { DriverEntiry } from './entities/driver.entity';
import { CustomWherePipe2 } from '@providers/custom-where2.pipe';
import { OrderByPipe, SelectPipe } from '@nodeteam/nestjs-pipes';
import { Prisma } from '@prisma/client';

@ApiTags('Drivers')
@ApiBearerAuth()
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driversService.create(createDriverDto);
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
  @UseAbility(Actions.read, DriverEntiry)
  async findAll(
    @Query('page')
    page?: number,
    @Query('perPage') perPage?: number,
    @Query('where', CustomWherePipe2) where?: Prisma.DriversWhereInput,
    @Query('orderBy', OrderByPipe)
    orderBy?: Prisma.DriversOrderByWithRelationInput,
    @Query('include', SelectPipe) include?: Prisma.DriversInclude,
  ) {
    return await this.driversService.findAll(
      where,
      orderBy,
      page,
      perPage,
      include,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driversService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driversService.update(+id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driversService.remove(+id);
  }
}
