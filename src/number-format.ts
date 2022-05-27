import { langs } from './languages'
import { Language } from './types'

const isClient = typeof window !== 'undefined'
const canUseFormatter = isClient ? !!window.Intl : true // support for old browsers;

const map: Record<string, Intl.NumberFormat | false> = {}

function getNumByLang(lang: Language, number: number) {
  if (map[lang] !== false) {
    // init
    map[lang] = canUseFormatter ? new Intl.NumberFormat(lang) : false
  }

  const node = map[lang]
  if (isNaN(number) || node === false) {
    return number + ''
  }

  return node.format(number)
}

export function numberFormat(lang: Language, number: number, precision?: number) {
  if (precision === undefined) {
    return getNumByLang(lang, number)
  }

  const dx = Math.pow(10, precision)
  const bigNum = Math.floor(number * dx)
  const floatDx = 1 / (dx * 10)

  const int = Math.floor(number)
  let float = Math.floor(bigNum - int * dx) / dx
  float += floatDx

  const localeInt = getNumByLang(lang, int)
  let localeFloat = getNumByLang(lang, float)
  localeFloat = localeFloat.substring(1, localeFloat.length - 1)

  return localeInt + (localeFloat.length > 1 ? localeFloat : '')
}

export function getNumber(lang: string | number, number?: number, precision?: number) {
  if (typeof lang === 'number') {
    return numberFormat(langs.currentLanguage, lang, number)
  }
  return numberFormat(lang, number as number, precision)
}
