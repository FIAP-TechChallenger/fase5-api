export class Usuario {
  constructor(
    public readonly uid: string,
    public readonly email: string,
    public readonly name?: string
  ) {}
}
