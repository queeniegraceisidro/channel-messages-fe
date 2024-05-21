export class BaseRequestError<TData> extends Error {

  data: TData | null

  constructor(message: string, data: TData) {
    // Call the constructor of the base class (Error)
    super(message);
    this.data = data;
    // Set the prototype explicitly to ensure instanceof works correctly
    Object.setPrototypeOf(this, BaseRequestError.prototype);
  }
}

export class BadRequest<TData> extends BaseRequestError<TData> {
  constructor(message: string, data: TData) {
    super(message, data);
    Object.setPrototypeOf(this, BadRequest.prototype);
  }
}