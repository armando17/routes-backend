import { InferSubjects } from '@casl/ability';

import { Actions, Permissions } from 'nest-casl';
import { Roles } from '@modules/app/app.roles';
import { TokensEntity } from '@modules/auth/entities/tokens.entity';

export type Subjects = InferSubjects<typeof TokensEntity>;

export const permissions: Permissions<Roles, Subjects, Actions> = {
  every({ can }) {
    can(Actions.delete, TokensEntity);
  },
};
