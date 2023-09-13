import { string, object } from 'yup'
import { TEXTS } from './constants/users'

export const UserSchema = () => {
  return object().shape({
    fullName: string()
      .max(TEXTS.FULL_NAME.MAX, TEXTS.FULL_NAME.ERROR_MAX)
      .required(TEXTS.FULL_NAME.ERROR_MSG),
    email: string()
      .email(TEXTS.EMAIL.ERROR_MSG)
      .test(TEXTS.EMAIL.NAME, TEXTS.EMAIL.FORMAT_ERROR_MSG, value =>
        TEXTS.EMAIL.TEST_FN(value as string)
      )
      .required(TEXTS.EMAIL.ERROR_MSG),
    phone: string()
      .min(TEXTS.PHONE.MIN, TEXTS.PHONE.ERROR_MIN_MSG)
      .test(
        TEXTS.PHONE.NAME,
        TEXTS.PHONE.FORMAT_ERROR_MSG,
        value => TEXTS.PHONE.TEST_FN(value as string)
      )
      .required(TEXTS.PHONE.ERROR_MSG),
    cpf: string()
      .min(TEXTS.CPF.MIN, TEXTS.CPF.ERROR_MIN)
      .required(TEXTS.CPF.ERROR_MSG),
    perfil: string(),
    birthDate: string()
  })

}