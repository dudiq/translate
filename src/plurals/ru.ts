import { Plural } from './types'

export const pluRu: Plural = {
  lang: 'ru',
  getIndex: (num) => {
    return num % 10 == 1 && num % 100 != 11
      ? 0
      : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)
      ? 1
      : 2
  },
}
