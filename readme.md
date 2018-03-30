Translate module (Internationalization)
=

translate key to lang value, using multiple language format

##how to use:

```
    translate(<lang, ...optional>, <groupPath>, <data, ...optional>) - default usage
    
    translate.addPlural(<PluData>) - register new plural formatter
    
    translate.addBlock(<BlockData>) - register new block with translates
    
    translate.getLang(); - return [string] of current language
    
    translate.setLang(<string>) - set new language for translates
    
    translate.getNumber(<number>) - return number in locale format

```

samples:
```
 import translate from 'translate';
 
 const text = translate('group.key'); // default usage
 
 const numberLocale = translate.getNumber(number); // return number in locale format
 
 const currLang = translate.getLang(); // current lang
 
 translate.setLang(newLang); // set new language for translates
 
 const text = translate('group.key', {
    dataKey: 'value'
 }); // with data pass

```
 adding new langs

```
 import translate from 'translate'; // module not binded to context
 import exampleBlock from './example.langs.js'; 
 
 translate.addBlock(exampleBlock); // make new langs for translates

```

 licence: MIT, dudiq 2018
