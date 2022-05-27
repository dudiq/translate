import { LangsList } from './types'

const n = typeof navigator === 'object' ? navigator : undefined
const DEF_LANG = 'en'

export class Languages {
  defaultLanguage = DEF_LANG

  currentLanguage = ((n && n.language) || '').substring(0, 2).toLowerCase() || DEF_LANG

  languageList = [DEF_LANG]

  setDefaultLanguage(lang: string) {
    this.defaultLanguage = lang
  }

  setLanguage(value: string) {
    this.currentLanguage = value
  }

  setLanguageList(value: LangsList) {
    this.languageList = value
  }
}

export const langs = new Languages()
