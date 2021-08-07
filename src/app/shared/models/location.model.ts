export interface ILocation {
  city: string;
  address: string;
  cap: string;
}

export class Location implements ILocation {
  private constructor(
    public city = '',
    public address = '',
    public cap = ''
  ) {
  }

  public static Build(location: ILocation): Location {
    return new this(
      location.city,
      location.address,
      location.cap
    )
  }
}
