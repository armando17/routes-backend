import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { CaslModule } from 'nest-casl';
import { permissions } from './drivers.permissions';
import { DriverRepository } from './drivers.repository';

@Module({
  imports: [CaslModule.forFeature({ permissions })],
  controllers: [DriversController],
  providers: [DriversService, DriverRepository],
})
export class DriversModule {}
