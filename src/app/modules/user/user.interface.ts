import { Model } from 'mongoose';

export type IUser = {
  id: string;
  role: string;
  password: string;
};

// type UserModel = Model<IUser, object>   ///1 Way
export type UserModel = Model<IUser, Record<string, unknown>>; ///2 Way
