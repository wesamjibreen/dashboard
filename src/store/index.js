import {createStore} from "vuex";
import {buildModules} from './modules';


// export default store;
export default function (options, config) {
    return createStore({
        ...options,
        modules: buildModules(config)
    });
};