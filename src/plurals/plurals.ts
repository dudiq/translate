import { numberFormat } from '../number-format'

import { pluEn } from './en'
import { pluRu } from './ru'
import { pluEs } from './es'
import { pluFr } from './fr'
import type { Plural } from './types'
import { logError } from '../logger'
import { Language, PluralData, PluralNode } from '../types'

const pluralMap: Record<string, Plural> = {}

function addPlural(plu: Plural) {
  if (pluralMap[plu.lang]) {
    logError(`trying register already defined plural - ${plu.lang}`)
    return
  }
  pluralMap[plu.lang] = plu
}

export function plurals(lang: Language, pluralFields: PluralNode, data?: PluralData) {
  const plu = pluralMap[lang]
  let ret = pluralFields.key || ''
  const isObject = typeof data === 'object'

  for (const key in pluralFields) {
    if (key === 'key') continue

    const num = (isObject ? data[key] : data) as number

    const pluArray = pluralFields[key]
    const index = plu.getIndex(num)
    let pluStr = pluArray ? pluArray[index] : ''
    const numFormatted = numberFormat(lang, num)
    pluStr = pluStr.replace('{#}', numFormatted)
    ret = ret.replace(`{#${key}}`, pluStr)
  }

  if (!isObject) return ret

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(pluralFields, key)) continue
    const val = data[key]
    ret = ret.replace(`{#${key}}`, `${val}`)
  }
  return ret
}

plurals.addPlural = function (plu: Plural | Plural[]) {
  if (!Array.isArray(plu)) {
    addPlural(plu)
    return
  }
  plu.forEach(function (item) {
    addPlural(item)
  })
}

// default plurals
plurals.addPlural([pluEn, pluRu, pluEs, pluFr])
