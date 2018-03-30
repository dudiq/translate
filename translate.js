import plurals from './plurals';
import numberFormat from './number-format';

const canUseConsole = (typeof console == 'object');

function logError() {
    if (canUseConsole) {
        const list = Array.prototype.slice.apply(arguments);
        list.splice(0, 0, '#translate:');
        console.error.apply(console, list);
    }
}

let currentLang = (navigator && (navigator.language || navigator.userLanguage) || '').substring(0, 2).toLowerCase() || 'en';

const translateMap = {};
const defSeparator = '.';

function applyData(str, data) {
    let ret = str;
    if (data){
        if (typeof data === 'object') {
            for (let key in data) {
                const val = data[key];
                ret = ret.replace(`{#${key}}`, val);
            }
        } else {
            ret = ret.replace('{#}', data);
        }
    }
    return ret;
}

function processKeyTree(obj, langs, hash, separator, cb) {
    if (typeof obj === 'object' && !Array.isArray(obj)) {
        for (const key in obj) {
            const newHash = (hash) ? hash + separator + key : key;
            const val = obj[key];
            if (typeof val === 'object' && !Array.isArray(val)) {
                processKeyTree(val, langs, newHash, separator, cb);
            } else {
                cb(langs, newHash, val);
            }
        }
    } else {
        cb(langs, hash, obj);
    }
}

function treeObjectToList (obj, langs, separator, cb) {
    if (typeof separator == 'function') {
        cb = separator;
        separator = defSeparator; // be default
    }
    processKeyTree(obj, langs, '', separator, cb);
}

function initLangs(item) {
    translateMap[item] = translateMap[item] || {};
}

function parseBlock(data, langs) {
    langs.forEach(initLangs);
    treeObjectToList(data, langs, onBlockParsed);
}

function onBlockParsed(langs, hash, data) {
    for (let i = 0, l = data.length; i < l; i++){
        const lang = langs[i];
        const item = data[i];
        const langMap = translateMap[lang];
        if (langMap[hash]) {
            logError('trying to register already defined HASH lang!', hash);
        } else {
            translateMap[lang][hash] = item;
        }
    }
}

function translate(lang, key, data) {
    let ret = '';
    if (arguments.length == 1) {
        key = lang;
        lang = currentLang;
    }
    if (arguments.length == 2 && !translateMap[lang]){
        data = key;
        key = lang;
        lang = currentLang;
    }
    const block = translateMap[lang];
    const field = block && block[key];
    if (field) {
        if (typeof field === 'object') {
            ret = plurals(lang, field, data);
        } else {
            ret = applyData(field, data);
        }
    } else {
        ret = key;
        logError(`not defined block [${key}] in ${lang} lang`);
    }
    return ret;
}

((methods) => {
    for (const key in methods) {
        translate[key] = methods[key];
    }
})({
    addPlural: function (plu) {
        plurals.addPlural(plu);
    },
    addBlock: function (block) {
        parseBlock(block.data, block.langs);
    },
    getLang: function () {
        return currentLang;
    },
    setLang: function (lang) {
        currentLang = lang;
    },
    getNumber: function (lang, number, precision) {
        if (typeof lang == 'number'){
            precision = number;
            number = lang;
            lang = currentLang;
        }
        return numberFormat(lang, number, precision);
    },
});

export default translate;
