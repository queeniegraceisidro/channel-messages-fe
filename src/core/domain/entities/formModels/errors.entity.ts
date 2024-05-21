import { mapErrorAttributes } from "../../../data/gateways/api/services/mappers/error.mappers";

export class FormRequestError<TErrors> extends Error {

  data: TErrors | null

  constructor(message: string, data: TErrors) {
    // Call the constructor of the base class (Error)
    super(message);
    this.data = mapErrorAttributes(data) as TErrors;
    // Set the prototype explicitly to ensure instanceof works correctly
    Object.setPrototypeOf(this, FormRequestError.prototype);
  }
}

export interface IFormError {
  nonFieldErrors?: string[]
}