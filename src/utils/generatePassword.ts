
import RandExp from 'randexp'
const randexp = new RandExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(\d)(\d)\1\2{1}[0-9a-zA-Z$*&@#]{16}$^/)

export function generatePassword() {
  randexp.max = 6
  const regex = randexp.gen()
  let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ!@#$%^&*()+?><:{}[]'
  let passwordLength = 16
  let password = ''

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length)
    password += chars.substring(randomNumber, randomNumber + 1)
  }

  return `${password}${regex}`
}
