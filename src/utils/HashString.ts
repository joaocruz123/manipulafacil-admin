export const HashString = (size: number, max: number) => {
  return (Math.random() + 1).toString(size).substring(max)
}


export const removeMask = (mobilePhone: string) => {
  return mobilePhone.replace(/[^0-9]+/g, '')
}
