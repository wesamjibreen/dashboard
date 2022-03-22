const DEFAULT_LOCALE = "ar";
import {common} from "../i18n"


window.currentLocale = DEFAULT_LOCALE;
const getValueByLocale = (value) => {
    if (!(value instanceof Object))
        return value;
    return _.get(value, window.currentLocale, _.get(Object.entries(value), '0.1'));
};


const generateCrudTrans = (key, translation, locale = DEFAULT_LOCALE) => {
    let trans = {};
    trans['create'] = _.get(common, `${locale}.create`, null) + ` ${translation}`;
    trans['edit'] = _.get(common, `${locale}.edit`, null) + ` ${translation}`;
    trans['show'] = _.get(common, `${locale}.show`, null) + ` ${translation}`;
    trans['all'] = _.get(common, `${locale}.all`, null) + ` ${translation}`;
    return trans;
};

export {
    getValueByLocale,
    generateCrudTrans
}
