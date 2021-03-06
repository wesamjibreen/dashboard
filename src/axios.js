import * as axios from "axios";
import { useStorage } from "@vueuse/core";
import useDeterminant from "./composable/useDeterminant";

const initRequests = function (base) {
    const instance = axios.create();
    instance.interceptors.request.use(function (config) {
        config.headers['Content-Type'] = 'application/json';
        let token = useStorage(`${base}_token`, null);
        let country = useStorage(`${base}_country`, null);
        let determinant = useStorage(`${base}_determinant`, null);
        let locale = useStorage(`${base}_locale`, null);
        const determinantKey = useStorage(`${base}_determinant_key`, null);

        if (token.value)
            _.set(config, 'headers.Authorization', `Bearer ${token.value}`);

        if (country.value)
            _.set(config, 'headers.Country', country.value);

        if (determinant.value)
            _.set(config, `headers.${determinantKey.value}`, JSON.parse(determinant.value).key);
        // _.set(config, 'headers.Determinant', JSON.parse(determinant.value).key);

        if (determinant.value)
            _.set(config, 'headers.Language', locale.value);


        return config;
    },
        error => Promise.reject(error)
    );
    return instance;
};

export default initRequests;