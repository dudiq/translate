import translate from './translate';
import example from './example.langs';

beforeAll(() => {
    translate.addBlock(example);
    translate.setLang('ru');
});

test('get using lang list', () => {
    translate.setLang('en');
    expect(translate.getLang() + '').toBe('en');
    translate.setLang('ru');
    expect(translate.getLang() + '').toBe('ru');
});

test('default get translate', () => {
    expect(translate('exTheme.dark')).toBe('Темная');
    expect(translate('en', 'exTheme.dark')).toBe('Dark');
});

test('get translate by lang', () => {
    expect(translate('ru', 'exTheme.dark')).toBe('Темная');
    expect(translate('en', 'exTheme.subBlock.secondary')).toBe('one');
    expect(translate('exTheme.subBlock.secondary')).toBe('один');
});


test('formatted number precision', () => {
    translate.setLang('ru');
    expect(translate.getNumber(123, 0)).toBe('123');
    expect(translate.getNumber(123, 2)).toBe('123,00');
    expect(translate.getNumber(123.12, 0)).toBe('123');
    expect(translate.getNumber(123.12, 2)).toBe('123,12');
    expect(translate.getNumber(123.129, 2)).toBe('123,12');
    expect(translate.getNumber(123.121, 2)).toBe('123,12');
    expect(translate.getNumber('en', 123, 2)).toBe('123.00');
});
test('formatted number', () => {
    const number = 12234.56;
    const toBeRu = `12${String.fromCharCode(160)}234,56`; // 160 - &nbsp; char code, will be '12 234,56'
    expect(translate.getNumber(number)).toBe(toBeRu);
    expect(translate.getNumber('en', number)).toBe('12,234.56');
});

test('plural', () => {
    expect(translate('check.plural', 1)).toBe('это 1 ответ');
    expect(translate('check.plural', 2)).toBe('это 2 ответа');
    expect(translate('check.plural', 5)).toBe('это 5 ответов');
    expect(translate('check.plural', 10)).toBe('это 10 ответов');
    expect(translate('check.plural', 0)).toBe('это 0 ответов');

    expect(translate('en', 'check.plural', 1)).toBe('this is 1 answer');
    expect(translate('en', 'check.plural', 2)).toBe('this is 2 answers');
    expect(translate('en', 'check.plural', 5)).toBe('this is 5 answers');
    expect(translate('en', 'check.plural', 10)).toBe('this is 10 answers');
    expect(translate('en', 'check.plural', 0)).toBe('this is 0 answers');

});

test('plural with formatted text', () => {
    expect(translate('check.plural', 10.5)).toBe('это 10,5 ответов');
    expect(translate('check.plural', 2.5)).toBe('это 2,5 ответа');
    expect(translate('check.plural', 1.5)).toBe('это 1,5 ответов');

    expect(translate('en', 'check.plural', 10.5)).toBe('this is 10.5 answers');
    expect(translate('en', 'check.plural', 2.5)).toBe('this is 2.5 answers');
    expect(translate('en', 'check.plural', 1.5)).toBe('this is 1.5 answers');
});

test('variable using', () => {
    expect(translate('en', 'check.customVar', {
        custom: translate('check.customVar', {
            custom: 'значение',
        }),
    })).toBe('var is переменная значение');


    expect(translate('check.customVar', {
        custom: translate('check.secondVar', {
            here: 'значение',
        }),
    })).toBe('переменная вторая значение');
});
