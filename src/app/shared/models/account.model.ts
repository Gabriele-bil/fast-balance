import { Card, ICard } from "@shared/models/card.model";

export interface IAccount {
  id?: string;
  name: string;
  description: string;
  cards: ICard[];
  backgroundImage: string;
  monthlyBudget: number;
  totalBalance: number;
  users: string[];
}

export class Account implements IAccount {
  private constructor(
    public id?: string,
    public name = '',
    public description = '',
    public cards: Card[] = [],
    public backgroundImage = '',
    public monthlyBudget = 0,
    public totalBalance = 0,
    public users: string[] = [],
  ) {
  }

  public static Build(account: IAccount): Account {
    const cards = account.cards?.map(card => Card.Build(card));

    return new this(
      account.id,
      account.name,
      account.description,
      cards,
      account.backgroundImage,
      account.monthlyBudget,
      account.totalBalance,
      account.users,
    )
  }
}
