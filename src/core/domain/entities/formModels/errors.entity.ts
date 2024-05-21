export class FormRequestError<TErrors> extends Error {

  data: TErrors | null

  constructor(message: string, data: TErrors) {
    // Call the constructor of the base class (Error)
    super(message);
    this.data = data;
    // Set the prototype explicitly to ensure instanceof works correctly
    Object.setPrototypeOf(this, FormRequestError.prototype);
  }
}