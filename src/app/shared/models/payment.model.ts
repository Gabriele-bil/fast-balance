export enum Importance {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export interface IPayment {
  id?: string;
  quantity: number;
  currency: 'eur' | 'usd'
  date: string;
  note: string;
  tags: string[];
  importance: Importance;
  isRecurrence: boolean;
  recurrenceInDays: number
}

export class Payment implements IPayment {
  private constructor(
    public id?: string,
    public quantity = 0,
    public currency: 'eur' | 'usd' = 'eur',
    public date = '',
    public note = '',
    public tags: string[] = [],
    public importance = Importance.LOW,
    public isRecurrence = false,
    public recurrenceInDays = 0
  ) {
  }

  public static Build(payment: IPayment): Payment {
    return new this(
      payment.id,
      payment.quantity,
      payment.currency,
      payment.date,
      payment.note,
      payment.tags,
      payment.importance,
      payment.isRecurrence,
      payment.recurrenceInDays
    )
  }
}
