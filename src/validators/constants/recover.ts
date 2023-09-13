import { regexEmail } from "@/utils/regex";

export const TEXTS = {
  EMAIL: {
    ERROR_MSG: "O campo Email é obrigatório",
    FORMAT_ERROR_MSG: "O Campo Email está fora do padrão",
    TEST_FN: (value: string) => regexEmail.test(value),
    NAME: "email",
  },
  MOBILE_PHONE: {
    MIN: 14,
    ERROR_MSG: "O campo Telefone celular é obrigatório",
    ERROR_MIN_MSG:
      "O campo Telefone celular deve conter apenas números e ter 11 dígitos.",
    FORMAT_ERROR_MSG:
      "O campo Telefone celular deve conten um número de celular válido",
    TEST_FN: (value: string) =>
      /^\([1-9]{2}\)?\s?([9])(\d{4}-\d{4})/g.test(value),
    NAME: "mobilePhone",
  },
  TOKEN: {
    MIN: 6,
    ERROR_MSG: "O campo token é obrigatório",
    ERROR_MIN_MSG:
      "O campo token deve conter apenas números e ter 6 dígitos.",
    TEST_FN: (value: string) =>
      /^\([1-9]{2}\)?\s?([9])(\d{4}-\d{4})/g.test(value),
    NAME: "token",
  },
  PASS: {
    MIN: 8,
    ERROR_REQUIRED: "Campo senha é obrigatório",
    ERROR_SMALL: "Campo senha precisa ter letras minúsculas",
    ERROR_CAP: "Campo senha é precisa ter letras maiúsculas",
    ERROR_SPECIAL: "Campo senha é precisa ter caracteres especiais",
    ERROR_NUMBER: "Campo senha é precisa ter números",
    ERROR_CONFIRM: "Campo senha é obrigatório",
    ERROR_CONFIRM_REQUERED: "Campo confirmar senha é obrigatório",
    ERROR_NOMATCH: "Campo confirmar senha é diferente da senha",
    TEST_NAME: "password",
  },
}