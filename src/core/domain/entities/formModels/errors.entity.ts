import { IBaseAPIErrorModel } from "../../../data/gateways/api/api-error.types";
import { mapErrorAttributes } from "../../../data/gateways/api/services/mappers/error.mappers";

export class FormRequestError<TErrors> extends Error {

  data: TErrors | IBaseAPIErrorModel | null

  constructor(message: string, data: TErrors) {
    // Call the constructor of the base class (Error)
    super(message);
    // Check for non_field_errors in data and map it
    if ((data as IBaseAPIErrorModel)?.non_field_errors) {
      this.data = mapErrorAttributes(data) as TErrors;
    } else {
      this.data = data;
    }
    // Set the prototype explicitly to ensure instanceof works correctly
    Object.setPrototypeOf(this, FormRequestError.prototype);
  }
}

export interface IFormError {
  nonFieldErrors?: string[]
}