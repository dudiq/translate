import {
  translate,
  translateByLang,
  setLangs,
  setLang,
  addBlock,
  getLang,
  getNumber,
} from '../src/index'
import example from './example.langs'
import example2 from './example.test.langs'

describe('translate', () => {
  beforeAll(() => {
    setLangs(['en', 'ru'])
    setLang('ru')

    addBlock(example)
    addBlock(example2)
    addBlock({
      data: {
        check1: ['first lang', 'second lang'],
        block2: [
          {
            key: 'this is {#val}',
            val: ['{#} answer', '{#} answers'],
          },
          {
            key: 'это {#val}',
            val: ['{#} ответ', '{#} ответа', '{#} ответов'],
          },
        ],
      },
    })
  })

  it('should switch current language', () => {
    setLang('en')
    expect(getLang() + '').toBe('en')
    setLang('es')
    expect(getLang() + '').toBe('es')
    expect(translate('exTheme.dark')).toBe('Dark')

    // set lang for other cases
    setLang('ru')
    expect(getLang() + '').toBe('ru')
  })

  it('should return used translates', () => {
    expect(translate('exTheme.dark')).toBe('Темная')
    expect(translateByLang('en', 'exTheme.dark')).toBe('Dark')
  })

  it('should return translates by lang', () => {
    expect(translateByLang('ru', 'exTheme.dark')).toBe('Темная')
    expect(translateByLang('en', 'exTheme.subBlock.secondary')).toBe('one')
    expect(translate('exTheme.subBlock.secondary')).toBe('один')
  })

  it('should format number precision', () => {
    setLang('ru')
    expect(getNumber(123, 0)).toBe('123')
    expect(getNumber(123, 2)).toBe('123,00')
    expect(getNumber(123.12, 0)).toBe('123')
    expect(getNumber(123.12, 2)).toBe('123,12')
    expect(getNumber(123.129, 2)).toBe('123,12')
    expect(getNumber(123.121, 2)).toBe('123,12')
    expect(getNumber('en', 123, 2)).toBe('123.00')
  })
  it('should return formatted number', () => {
    const number = 12234.56
    const toBeRu = `12${String.fromCharCode(160)}234,56` // 160 - &nbsp; char code, will be '12 234,56'
    expect(getNumber(number)).toBe(toBeRu)
    expect(getNumber('en', number)).toBe('12,234.56')
  })

  it('plural', () => {
    expect(translate('check.plural', 1)).toBe('это 1 ответ')
    expect(translate('check.plural', 2)).toBe('это 2 ответа')
    expect(translate('check.plural', 5)).toBe('это 5 ответов')
    expect(translate('check.plural', 10)).toBe('это 10 ответов')
    expect(translate('check.plural', 0)).toBe('это 0 ответов')

    expect(translateByLang('en', 'check.plural', 1)).toBe('this is 1 answer')
    expect(translateByLang('en', 'check.plural', 2)).toBe('this is 2 answers')
    expect(translateByLang('en', 'check.plural', 5)).toBe('this is 5 answers')
    expect(translateByLang('en', 'check.plural', 10)).toBe('this is 10 answers')
    expect(translateByLang('en', 'check.plural', 0)).toBe('this is 0 answers')
  })

  it('plural with formatted text', () => {
    expect(
      translate('check.plural', {
        val: 10.5,
      }),
    ).toBe('это 10,5 ответов')
    expect(translate('check.plural', 10.5)).toBe('это 10,5 ответов')
    expect(translate('check.plural', 2.5)).toBe('это 2,5 ответа')
    expect(translate('check.plural', 1.5)).toBe('это 1,5 ответов')

    expect(translateByLang('en', 'check.plural', 10.5)).toBe('this is 10.5 answers')
    expect(translateByLang('en', 'check.plural', 2.5)).toBe('this is 2.5 answers')
    expect(translateByLang('en', 'check.plural', 1.5)).toBe('this is 1.5 answers')
  })

  it('plural with custom data', () => {
    expect(
      translateByLang('en', 'exTitle', {
        myCustomVar: 'second',
        plu: 1,
        pluSecond: 2,
      }),
    ).toBe('Word in english 1 word two 2 second')

    expect(
      translate('exTitle', {
        myCustomVar: 'test',
      }),
    ).toBe('Строка на русском test')
  })

  it('variable using', () => {
    expect(
      translateByLang('en', 'check.customVar', {
        custom: translate('check.customVar', {
          custom: 'значение',
        }),
      }),
    ).toBe('var is переменная значение')

    expect(
      translate('check.customVar', {
        custom: translate('check.secondVar', {
          here: 'значение',
        }),
      }),
    ).toBe('переменная вторая значение')
  })

  it('.setLangs()', () => {
    setLang('en')
    expect(getLang() + '').toBe('en')
    expect(translate('setLangsTest.dark')).toBe('Dark')

    setLang('es')
    expect(getLang() + '').toBe('es')
    expect(translate('setLangsTest.dark')).toBe('Dark')

    // set lang for other cases
    setLang('ru')
    expect(getLang() + '').toBe('ru')
    expect(translate('setLangsTest.dark')).toBe('Темная')
  })
})
