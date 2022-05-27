import type { LangsList } from './types'
import { langs } from './languages'
import type { Plural } from './plurals/types'
import { plurals } from './plurals/plurals'

export { toggleLogError } from './logger'
export { getNumber } from './number-format'
export { translate, translateByLang, addBlock } from './translate'

export function getLang() {
  return langs.currentLanguage
}

export function setLangs(list: LangsList) {
  langs.setLanguageList(list)
}

export function setLang(lang: string) {
  langs.setLanguage(lang)
}

export function setDefaultLanguage(lang: string) {
  langs.setDefaultLanguage(lang)
}

export function addPlural(plu: Plural | Plural[]) {
  plurals.addPlural(plu)
}
