# Translate module (Internationalization)

translate key to lang value, using multiple language format

##how to use:

```
    translate(<lang, ...optional>, <groupPath>, <data, ...optional>) - default usage

    addPlural(<PluData>) - register new plural formatter

    addBlock(<BlockData>) - register new block with translates

    getLang(); - return [string] of current language

    setLang(<string>) - set new language for translates

    getNumber(<number>) - return number in locale format

```

samples:

```
 import {translate, getNumber, getLang, setLang} from 'jr-translate';

 const text = translate('group.key'); // default usage

 const numberLocale = getNumber(number); // return number in locale format

 const currLang = getLang(); // current lang

 setLang(newLang); // set new language for translates

 const text = translate('group.key', {
    dataKey: 'value'
 }); // with data pass

```

adding new langs

```
 import {addBlock} from 'jr-translate'; // module not binded to context
 import exampleBlock from './example.langs.ts';

 addBlock(exampleBlock); // make new langs for translates

```

licence: MIT, dudiq 2022
