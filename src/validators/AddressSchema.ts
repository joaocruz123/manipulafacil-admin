import { string, object } from 'yup'
import { TEXTS } from './constants/address'

export const AddressSchema = () => {
  return object().shape({
    nickname: string()
      .max(TEXTS.NAME.MAX, TEXTS.NAME.ERROR_MAX)
      .required(TEXTS.NAME.ERROR_MSG),
    cep: string()
      .min(TEXTS.CEP.MIN, TEXTS.CEP.ERROR_MIN)
      .required(TEXTS.CEP.ERROR_MSG)
  })
}