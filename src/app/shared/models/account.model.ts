export interface IAccount {
  id: string;
  name: string;
  description: string;
  cards: any[];
  backgroundImage: string;
  monthlyBudget: number;
  totalBalance: number;
  users: string[];
}

export class Account implements IAccount {
  private constructor(
    public id = '',
    public name = '',
    public description = '',
    public cards: string[] = [],
    public backgroundImage = '',
    public monthlyBudget = 0,
    public totalBalance = 0,
    public users: string[] = [],
  ) {
  }

  public static Build(account: IAccount): Account {
    return new this(
      account.id,
      account.name,
      account.description,
      account.cards,
      account.backgroundImage,
      account.monthlyBudget,
      account.totalBalance,
      account.users,
    )
  }
}
