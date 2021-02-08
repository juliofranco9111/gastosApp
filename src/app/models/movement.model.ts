
export class Movement {
  constructor(
    public type: string,
    public amount: number,
    public category: string,
    public id: string,
    public month: Number,
    public year: Number,
    public comment: string
  ) {}
}