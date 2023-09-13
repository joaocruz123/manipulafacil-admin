import { string, object, ref, boolean } from "yup";
import { TEXTS } from "./constants/recover";

export const RecoverPasswordSchema = (valueTokenType: string | undefined) => {
  return object().shape({
    email: string().when([], {
      is: () => valueTokenType === "email",
      then: (schema) => schema.email(TEXTS.EMAIL.ERROR_MSG)
        .test(TEXTS.EMAIL.NAME, TEXTS.EMAIL.FORMAT_ERROR_MSG, (value) =>
          TEXTS.EMAIL.TEST_FN(value as string)
        ),
    }),

    phone: string()
      .when([], {
        is: () => valueTokenType === "sms",
        then: (schema) => schema.test(
          TEXTS.MOBILE_PHONE.NAME,
          TEXTS.MOBILE_PHONE.FORMAT_ERROR_MSG,
          (value) => TEXTS.MOBILE_PHONE.TEST_FN(value as string)
        ),
      }),

  });
}

export const RecoverPasswordTokenSchema = object().shape({
  token: string()
    .min(TEXTS.TOKEN.MIN, TEXTS.TOKEN.ERROR_MIN_MSG)
    .required(TEXTS.TOKEN.ERROR_MSG),
});

export const NewPasswordSchema = object().shape({
  password: string()
    .required(TEXTS.PASS.ERROR_REQUIRED)
    .matches(/\w*[a-z]\w*/, TEXTS.PASS.ERROR_SMALL)
    .matches(/\w*[A-Z]\w*/, TEXTS.PASS.ERROR_CAP)
    .matches(/\d/, TEXTS.PASS.ERROR_NUMBER)
    .matches(/[!+@#$%^&*()\-_"=+{}; :,<.>]/, TEXTS.PASS.ERROR_SPECIAL)
    .min(
      TEXTS.PASS.MIN,
      ({ min }) => `Campo senha precisa ter no mínimo ${min} caracteres`
    ),
  confirmPassword: string()
    .required(TEXTS.PASS.ERROR_CONFIRM_REQUERED)
    .oneOf([ref("password")], TEXTS.PASS.ERROR_NOMATCH),
});
