export interface IPayment {
  id?: string;
  quantity: number;
  currency: 'eur' | 'usd'
  date: string;
  note: string;
}

export class Payment implements IPayment {
  private constructor(
    public id?: string,
    public quantity = 0,
    public currency: 'eur' | 'usd' = 'eur',
    public date = '',
    public note = '',
  ) {
  }

  public static Build(payment: IPayment): Payment {
    return new this(
      payment.id,
      payment.quantity,
      payment.currency,
      payment.date,
      payment.note
    )
  }
}
