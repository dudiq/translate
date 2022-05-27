import { Plural } from './types'

export const pluEs: Plural = {
  lang: 'es',
  getIndex: (num) => {
    return num !== 1 ? 1 : 0
  },
}
