import { Entity, model, property, hasOne} from '@loopback/repository';

import  jwt  from 'jsonwebtoken';
import {UserCredentials} from './user-credentials.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    // generated: true,
    // useDefaultIdType: false,
    // postgresql: {
    //   dataType: 'uuid',
    // },
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  constructor(data?: Partial<User>) {
    super(data);
  }
}
