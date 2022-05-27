import { Plural } from './types'

export const pluFr: Plural = {
  lang: 'fr',
  getIndex: (num) => {
    return num > 1 ? 1 : 0
  },
}
