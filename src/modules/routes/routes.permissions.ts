import { InferSubjects } from '@casl/ability';
import { Actions, Permissions } from 'nest-casl';
import { Roles } from '@modules/app/app.roles';
import { RouteEntity } from './entities/route.entity';

export type Subjects = InferSubjects<typeof RouteEntity>;

export const permissions: Permissions<Roles, Subjects, Actions> = {
  admin({ can }) {
    can(Actions.read, RouteEntity);
  },
  customer({ cannot }) {
    cannot(Actions.read, RouteEntity);
  },
};
