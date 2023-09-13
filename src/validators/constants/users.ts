import { regexEmail } from '@/utils/regex'

export const TEXTS = {
  FULL_NAME: {
    MAX: 200,
    ERROR_MSG: 'O campo Nome Completo é obrigatório',
    ERROR_MAX: 'O Campo Nome Completo deve ter no máximo 200 caracteres',
    NAME: 'fullName'
  },
  EMAIL: {
    ERROR_MSG: 'O campo Email é obrigatório',
    FORMAT_ERROR_MSG: 'O Campo Email está fora do padrão',
    TEST_FN: (value: string) => regexEmail.test(value),
    NAME: 'email'
  },
  PHONE: {
    MIN: 14,
    ERROR_MSG: 'O campo Telefone celular é obrigatório',
    ERROR_MIN_MSG:
      'O campo Telefone celular deve conter apenas números e ter 11 dígitos.',
    FORMAT_ERROR_MSG:
      'O campo Telefone celular deve conten um número de celular válido',
    TEST_FN: (value: string) =>
      /^\([1-9]{2}\)?\s?([9])(\d{4}-\d{4})/g.test(value),
    NAME: 'phone'
  },
  CPF: {
    MIN: 12,
    ERROR_MSG: 'O campo CPF é obrigatório',
    ERROR_MIN: 'O Campo CPF deve ter no minimo 12 caracteres',
    NAME: 'cpf'
  }
}