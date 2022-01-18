const DEFAULT_LOCALE = "ar";

const getValueByLocale = (value, locale = DEFAULT_LOCALE) => {
    if (!(value instanceof Object))
        return value;
    return _.get(value, locale, _.get(Object.entries(value), '0.1'));
};


const generateCrudTrans = (key, translation) => {
    let trans = {};
    trans['create'] = ` إضافة ${translation}`;
    trans['edit'] = ` تعديل ${translation}`;
    trans['show'] = ` عرض ${translation}`;
    trans['all'] = ` عرض ${translation}`;
    return trans;
};

export {
    getValueByLocale,
    generateCrudTrans
}