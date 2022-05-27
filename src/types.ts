export type Language = string
export type LangsList = Language[]

export type TranslatesNode = string[]
export type PluralNode = {
  key: string
  [key: string]: string | TranslatesNode
}

export type PluralData = number | Record<string, number | string>

export type NestedTreeStructure = string | Record<string, unknown | PluralData>
export type TranslateBlock = {
  langs?: LangsList
  data: NestedTreeStructure
}
