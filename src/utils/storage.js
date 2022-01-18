const getTokenKey = (module) => {
    return `${module}_token`;
};

const getUserKey = (module) => {
    return `${module}_auth`;
};

const getCountryKey = (module) => {
    return `${module}_country`;
};


export {
    getTokenKey,
    getUserKey,
    getCountryKey
}