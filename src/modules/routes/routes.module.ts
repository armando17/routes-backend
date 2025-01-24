import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { CaslModule } from 'nest-casl';
import { permissions } from './routes.permissions';
import { RouteRepository } from './routes.repository';
import { OrdersModule } from '@modules/orders/orders.module';

@Module({
  imports: [CaslModule.forFeature({ permissions }), OrdersModule],
  controllers: [RoutesController],
  providers: [RoutesService, RouteRepository],
})
export class RoutesModule {}
