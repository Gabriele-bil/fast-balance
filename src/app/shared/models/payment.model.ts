export interface IPayment {
  id: string;
  quantity: number;
  date: string;
  note: string;
}

export class Payment implements IPayment {
  private constructor(
    public id = '',
    public quantity = 0,
    public date = '',
    public note = '',
  ) {
  }

  public static Build(payment: IPayment): Payment {
    return new this(
      payment.id,
      payment.quantity,
      payment.date,
      payment.note
    )
  }
}
