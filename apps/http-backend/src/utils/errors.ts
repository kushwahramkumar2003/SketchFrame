export class CustomError extends Error {
  constructor(
    public name: string,
    public message: string,
    public statusCode: number
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
