import { IPayment, Payment } from "@shared/models/payment.model";
import { Color, WalletImg } from "@shared/models/enums";

export interface ICard {
  id?: string;
  name: string;
  description: string;
  backgroundUrl: string;
  iconUrl: WalletImg;
  color: Color;
  balance: number;
  limitBudget: boolean;
  monthlyBudget: number;
  userId: string;
  payments: IPayment[];
}

export class Card implements ICard {
  private constructor(
    public id?: string,
    public name = '',
    public description = '',
    public backgroundUrl = '',
    public iconUrl = WalletImg.COLORED,
    public color = Color.WHITE,
    public balance = 0,
    public monthlyBudget = 0,
    public limitBudget = false,
    public userId = '',
    public payments: Payment[] = []
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
      card.limitBudget,
      card.userId,
      payments
    );
  }
}
