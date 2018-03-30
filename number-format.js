const isClient = (typeof window !== 'undefined');
const canUseFormatter = isClient ? (!!window.Intl) : true; // support for old browsers;

const map = {};

function getNumByLang(lang, number) {
    let ret = number;
    if (map[lang] !== false) {
        // init
        map[lang] = canUseFormatter ?
            new Intl.NumberFormat(lang) :
            false;
    }
    if (map[lang] && !isNaN(number - 0)) {
        ret = map[lang].format(number);
    }
    return ret;
}

export default function (lang, number, precision) {
    let ret = '';
    if (precision !== undefined) {
        const dx = Math.pow(10, precision);
        const bigNum = Math.floor(number * dx);
        const floatDx = 1 / (dx * 10);

        const int = Math.floor(number);
        let float = Math.floor(bigNum - (int * dx)) / dx;
        float += floatDx;

        const localeInt = getNumByLang(lang, int);
        let localeFloat = getNumByLang(lang, float);
        localeFloat = localeFloat.substring(1, localeFloat.length - 1);

        ret = localeInt + ((localeFloat.length > 1) ? localeFloat : '');
    } else {
        ret = getNumByLang(lang, number);
    }

    return ret;
}
