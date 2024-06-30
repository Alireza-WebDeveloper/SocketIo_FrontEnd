import { User } from './user';

export interface Message {
  data: { user_send: User; user_recive: User };
}
