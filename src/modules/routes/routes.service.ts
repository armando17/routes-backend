import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Prisma } from '@prisma/client';
import { RouteRepository } from './routes.repository';
import { NOT_FOUND } from '@constants/errors.constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RoutesService {
  constructor(
    private readonly routeRepository: RouteRepository,
    private readonly configService: ConfigService,
  ) {}
  async create(createRouteDto: CreateRouteDto) {
    return await this.routeRepository.create(createRouteDto);
  }

  async findAll(
    where: Prisma.RoutesWhereInput,
    orderBy: Prisma.RoutesOrderByWithRelationInput = {},
    page = 1,
    perPage = 10,
    include: Prisma.RoutesInclude = {},
  ) {
    return await this.routeRepository.findAll(
      where,
      orderBy,
      page,
      perPage,
      include,
    );
  }

  async findOne(id: number) {
    return await this.routeRepository.findOne({
      where: { id },
      include: {
        orders: {
          orderBy: {
            sequence: 'asc', // o 'desc' según tu preferencia
          },
        },
      },
    });
  }

  async findOneExternal(id: number) {
    const externalApi = this.configService.get<string>('app.externalApi');
    const response = await fetch(`${externalApi}/routes/${id}`);

    if (!response.ok) {
      //throw new Error('Network response was not ok');
      throw new NotFoundException(NOT_FOUND);
    }
    const json = await response.json();
    return json;
  }
  async update(id: number, updateRouteDto: UpdateRouteDto) {
    return await this.routeRepository.update(id, updateRouteDto);
  }

  async remove(id: number) {
    return await this.routeRepository.remove(id);
  }
}
