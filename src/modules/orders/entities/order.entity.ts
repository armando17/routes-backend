import { Orders } from '@prisma/client';

export class OrderEntity implements Orders {
  id: number;
  sequence: number;
  value: number;
  priority: boolean;
  routeId: number;
}
