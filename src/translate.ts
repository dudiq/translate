import { plurals } from './plurals/plurals'
import { logError } from './logger'
import {
  LangsList,
  PluralData,
  PluralNode,
  TranslateBlock,
  NestedTreeStructure,
  Language,
} from './types'
import { langs } from './languages'

type FlatNodeList = Record<string, string | PluralNode>

const hashMap: Record<Language, FlatNodeList> = {}
const DEF_SEPARATOR = '.'

function applyData(str: string, data?: PluralData) {
  if (!data) return str

  if (typeof data !== 'object') {
    return str.replace('{#}', `${data}`)
  }

  let ret = str
  for (const key in data) {
    const val = data[key]
    ret = ret.replace(`{#${key}}`, `${val}`)
  }
  return ret
}

function onBlockParsed(langsList: LangsList, hash: string, block: unknown) {
  if (Array.isArray(block)) {
    setToMap(block, langsList, hash, block)
  } else {
    setToMap(langsList, langsList, hash, block)
  }
}

function processKeyTree(
  nestedTree: NestedTreeStructure,
  langsList: LangsList,
  hash: string,
  separator: string,
) {
  if (typeof nestedTree !== 'object' || Array.isArray(nestedTree)) {
    onBlockParsed(langsList, hash, nestedTree)
    return
  }

  for (const key in nestedTree) {
    const newHash = hash ? hash + separator + key : key
    const block = nestedTree[key] as NestedTreeStructure
    processKeyTree(block, langsList, newHash, separator)
  }
}

function initLangs(lang: string) {
  hashMap[lang] = hashMap[lang] || {}
}

function parseBlock(block: NestedTreeStructure, langsList: LangsList) {
  langsList.forEach(initLangs)
  processKeyTree(block, langsList, '', DEF_SEPARATOR)
}

function setToMap(list: string[], langsList: LangsList, hash: string, data: unknown) {
  for (let i = 0, l = list.length; i < l; i++) {
    const lang = langsList[i] || langs.defaultLanguage
    const item = Array.isArray(data) ? data[i] : data
    const langMap = hashMap[lang]
    if (langMap[hash]) {
      logError('trying to register already defined HASH lang!', hash)
    } else {
      hashMap[lang][hash] = item
    }
  }
}

function getData(lang: Language, field: string | PluralNode, data?: PluralData) {
  if (typeof field === 'object') {
    return plurals(lang, field, data)
  }
  return applyData(field, data)
}

function getBlockByKey(lang: Language, key: string, data?: PluralData): string | undefined {
  const translateBlock = hashMap[lang]
  if (translateBlock && translateBlock[key] !== undefined) {
    return getData(lang, translateBlock[key], data)
  }
  return
}

export function translate(key: string, data?: PluralData): string {
  return translateByLang(langs.currentLanguage, key, data)
}

export function translateByLang(lang: Language, key: string, data?: PluralData): string {
  const result = getBlockByKey(lang, key, data)

  if (result !== undefined) {
    return result
  }

  logError(`not defined block [${key}] in ${lang} lang`)

  if (lang === langs.defaultLanguage) {
    return key
  }

  const defaultResult = getBlockByKey(langs.defaultLanguage, key, data)
  if (defaultResult === undefined) {
    return key
  }
  return defaultResult
}

export function addBlock(block: TranslateBlock) {
  parseBlock(block.data, block.langs || langs.languageList)
}
