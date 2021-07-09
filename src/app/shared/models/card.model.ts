import { IPayment, Payment } from "@shared/models/payment.model";

export interface ICard {
  id?: string;
  name: string;
  description: string;
  backgroundUrl: string;
  color: string;
  balance: number;
  paymentLimit: number;
  payments: IPayment[];
}

export class Card {
  private constructor(
    public id?: string,
    public name = '',
    public description = '',
    public backgroundUrl = '',
    public color = '',
    public balance = 0,
    public paymentLimit = 0,
    public payments: Payment[] = []
  ) {
  }

  public static Build(card: ICard): Card {
    const payments = card.payments.map(payment => Payment.Build(payment));

    return new this(
      card.id,
      card.name,
      card.description,
      card.backgroundUrl,
      card.color,
      card.balance,
      card.paymentLimit,
      payments
    );
  }
}
