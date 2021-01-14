

export class User {
  constructor(
    public uid: string,
    public name: string,
    public lastName: string,
    public email: string,
    public agree: boolean
  ) {}
}