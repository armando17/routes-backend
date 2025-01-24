import { InferSubjects } from '@casl/ability';
import { Actions, Permissions } from 'nest-casl';
import { Roles } from '@modules/app/app.roles';
import { OrderEntity } from '@modules/orders/entities/order.entity';

export type Subjects = InferSubjects<typeof OrderEntity>;

export const permissions: Permissions<Roles, Subjects, Actions> = {
  admin({ can }) {
    can(Actions.read, OrderEntity);
  },
  customer({ cannot }) {
    cannot(Actions.read, OrderEntity);
  },
};
