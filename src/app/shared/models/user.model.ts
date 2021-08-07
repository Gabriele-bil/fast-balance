import { ILocation } from "@shared/models/location.model";
import { Card, ICard } from "@shared/models/card.model";

export type UserCredential = { email: string, username: string };

export enum Gender {
  MALE = 'Uomo',
  FEMALE = 'Donna',
  OTHER = 'Altro'
}

export interface IUser {
  id?: string;
  name: string;
  surname: string;
  username: string;
  email: string;
  age: number;
  job: string;
  pictureUrl: string;
  location: ILocation;
  publicProfile: boolean;
  cards: ICard[];
  createdDate: string;
  status: 'active' | 'banned';
  phoneNumber: string;
  biography: string;
  website: string;
  gender: Gender;
}

export class User implements IUser {
  private constructor(
    public id?: string,
    public name = '',
    public surname = '',
    public username = '',
    public email = '',
    public age = 0,
    public job = '',
    public pictureUrl = '',
    public location: ILocation = {
      city: '',
      address: '',
      cap: '',
    },
    public publicProfile = false,
    public cards: Card[] = [],
    public createdDate = '',
    public status: 'active' | 'banned' = 'active',
    public phoneNumber = '',
    public biography = '',
    public website = '',
    public gender = Gender.OTHER,
  ) {
  }

  public static Build(user: IUser): User {

    const cards = user.cards?.map(card => Card.Build(card));

    return new this(
      user.id,
      user.name,
      user.surname,
      user.username,
      user.email,
      user.age,
      user.job,
      user.pictureUrl,
      user.location,
      user.publicProfile,
      cards,
      user.createdDate,
      user.status,
      user.phoneNumber,
      user.biography,
      user.website,
      user.gender,
    )
  }
}
