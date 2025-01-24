import { Drivers } from '@prisma/client';

export class DriverEntiry implements Drivers {
  id: number;
  name: string;
}
