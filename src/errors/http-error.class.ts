export class HTTPError extends Error {
  private _statusCode: number;
  private _context?: string;
  constructor(statusCode: number, message: string, context?: string) {
    super(message);
    this.message = message;

    this._statusCode = statusCode;
    this._context = context;
  }

  get statusCode() {
    return this._statusCode;
  }

  get context() {
    return this._context;
  }
}
