import BaseLayout from "./src/layouts/BaseLayout";
import initI18n from "./src/i18n";
import {generateRoutes, initRouter} from "./src/router";
import initStore from "./src/store";
import {createHead as initHead} from "@vueuse/head";
import EndPoints from "./src/endPoints";
import * as common from "./src/utils/helper";
import {GlobalComponents as components} from "./src/components";
import {GlobalMixins as mixins} from "./src/mixins";

export {
    mixins,
    components,
    initHead,
    initStore,
    initRouter,
    EndPoints,
    initI18n,
    BaseLayout,
    common,
    generateRoutes
}