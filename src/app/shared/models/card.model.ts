import { IPayment, Payment } from "@shared/models/payment.model";

export interface ICard {
  id?: string;
  name: string;
  description: string;
  backgroundUrl: string;
  iconUrl: string;
  color: string;
  balance: number;
  monthlyBudget: number;
  payments: IPayment[];
  usersId: string[];
}

export class Card {
  private constructor(
    public id?: string,
    public name = '',
    public description = '',
    public backgroundUrl = '',
    public iconUrl = '',
    public color = '',
    public balance = 0,
    public monthlyBudget = 0,
    public payments: Payment[] = [],
    public usersId: string[] = [],
  ) {
  }

  public static Build(card: ICard): Card {
    const payments = card.payments?.map(payment => Payment.Build(payment));

    return new this(
      card.id,
      card.name,
      card.description,
      card.backgroundUrl,
      card.iconUrl,
      card.color,
      card.balance,
      card.monthlyBudget,
      payments,
      card.usersId
    );
  }
}
