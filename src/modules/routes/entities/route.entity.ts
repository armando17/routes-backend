import { Routes } from '@prisma/client';

export class RouteEntity implements Routes {
  id: number;
  driverId: number;
  date: Date;
  notes: string;
}
