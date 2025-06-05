export class AppError extends Error {
  public readonly statusCode: number = 500;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode?: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
