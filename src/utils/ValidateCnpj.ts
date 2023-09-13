import { OnlyNumber } from '@/utils'

export const ValidateCNPJ = (cnpj = '') => {
  const cnpjValue = OnlyNumber(cnpj)
  if (cnpjValue.length !== 14) {
    return false
  }

  const tempCnpj = cnpjValue.length - 2
  const digit = cnpjValue.substring(tempCnpj)
  const digiOne = parseInt(digit.charAt(0), 10)
  const digitTwo = parseInt(digit.charAt(1), 10)
  const calcCnpj = (cnpjNumber: number) => {
    const number = cnpjValue.substring(0, cnpjNumber)
    let multiplier = cnpjNumber - 7
    let sum = 0
    let result = 0

    for (let i = cnpjNumber; i >= 1; i--) {
      // @ts-ignore
      sum += number.charAt(cnpjNumber - i) * multiplier--
      if (multiplier < 2) {
        multiplier = 9
      }
    }

    result = 11 - (sum % 11)
    return result > 9 ? 0 : result
  }

  return calcCnpj(tempCnpj) === digiOne && calcCnpj(tempCnpj + 1) === digitTwo
}
