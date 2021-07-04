import { ILocation } from "@shared/models/location.model";
import { Account, IAccount } from "@shared/models/account.model";

export type UserCredential = { email: string, username: string };

export interface IUser {
  id: string;
  name: string;
  surname: string;
  username: string;
  email: string;
  age: number;
  work: string;
  pictureUrl: string;
  location: ILocation;
  publicProfile: boolean;
  accounts: IAccount[];
  createdDate: string;
}

export class User implements IUser {
  private constructor(
    public id = '',
    public name = '',
    public surname = '',
    public username = '',
    public email = '',
    public age = 0,
    public work = '',
    public pictureUrl = '',
    public location: ILocation = {
      city: '',
      address: '',
      cap: '',
    },
    public publicProfile = false,
    public accounts: Account[] = [],
    public createdDate = ''
  ) {
  }

  public static Build(user: IUser): User {

    const accounts = user.accounts.map(account => Account.Build(account));

    return new this(
      user.id,
      user.name,
      user.surname,
      user.username,
      user.email,
      user.age,
      user.work,
      user.pictureUrl,
      user.location,
      user.publicProfile,
      accounts,
      user.createdDate
    )
  }
}
