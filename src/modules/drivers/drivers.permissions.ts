import { InferSubjects } from '@casl/ability';
import { Actions, Permissions } from 'nest-casl';
import { Roles } from '@modules/app/app.roles';
import { DriverEntiry } from './entities/driver.entity';

export type Subjects = InferSubjects<typeof DriverEntiry>;

export const permissions: Permissions<Roles, Subjects, Actions> = {
  admin({ can }) {
    can(Actions.read, DriverEntiry);
  },
  customer({ cannot }) {
    cannot(Actions.read, DriverEntiry);
  },
};
