

export class User {
  constructor(
    public uid: string,
    public displayName: string,
    public email: string,
    public agree: boolean,
    public role: 'ADMIN' | 'USER',
    public google: boolean
  ) {}
}