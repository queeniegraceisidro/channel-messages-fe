import { IFormError } from "../../../../../domain/entities/formModels/errors.entity"

export const mapErrorAttributes = (initialModel: any): IFormError => {
  return {
    nonFieldErrors: initialModel.non_field_errors
  }
}