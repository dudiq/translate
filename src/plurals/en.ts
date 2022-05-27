import { Plural } from './types'

export const pluEn: Plural = {
  lang: 'en',
  getIndex: (num) => {
    return num !== 1 ? 1 : 0
  },
}
