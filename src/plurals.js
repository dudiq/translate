import numberFormat from './number-format';

import pluEn from './plurals/en';
import pluRu from './plurals/ru';
import pluEs from './plurals/es';
import pluFr from './plurals/fr';

const canUseConsole = (typeof console == 'object');

const pluralMap = {};

function logError() {
    if (canUseConsole) {
        const list = Array.prototype.slice.apply(arguments);
        list.splice(0, 0, '#translate.plurals:');
        console.error.apply(console, list);
    }
}

function addPlural(plu) {
    if (pluralMap[plu.lang]) {
        logError(`trying register already defined plural - ${plu.lang}`);
    } else {
        pluralMap[plu.lang] = plu;
    }
}

function plural(lang, fields, data) {
    const plu = pluralMap[lang];
    let ret = fields.key || '';
    let asMap = false;
    if (typeof data === 'object') {
        asMap = true;
    }

    for (const key in fields) {
        if (key != 'key') {
            const num = asMap ?
                data[key] :
                data;

            const pluArray = fields[key];
            const index = plu.getIndex(num);
            let pluStr = pluArray ? pluArray[index] : '';
            const numFormatted = numberFormat(lang, num);
            pluStr = pluStr.replace('{#}', numFormatted);
            ret = ret.replace(`{#${key}}`, pluStr);
        }
    }

    if (asMap) {
        for (let key in data) {
            if (!fields.hasOwnProperty(key)) {
                const val = data[key];
                ret = ret.replace(`{#${key}}`, val);
            }
        }
    }

    return ret;
}

plural.addPlural = function (plu) {
    if (Array.isArray(plu)) {
        plu.forEach(function (item) {
            addPlural(item);
        })
    } else {
        addPlural(plu);
    }
};


// default plurals
plural.addPlural([pluEn, pluRu, pluEs, pluFr]);

export default plural;
