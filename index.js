import {createApp, h} from 'vue';
import {components, EndPoints, initHead, initI18n, initRouter, initStore, mixins} from "./modules";
import RootApp from "./src/RootApp.vue";
import initRequests from "./src/axios";
import VueGoogleMaps from '@fawmi/vue-google-maps'

import VueViewer from 'v-viewer'

export default class App {
    mixins = mixins;

    components = components;

    modules = [];

    constructor({base, routes, endPoints, config, i18n = {}, components = {}, mixins = []}, callbacks = {}, ...options) {
        this.routes = routes;
        this.config = config;
        this.endPoints = endPoints;
        this.options = options;
        this.callbacks = callbacks;
        this.base = base;
        this.sanitizeI18n(i18n);
        this.sanitizeComponents(components);
        this.sanitizeMixins(mixins);
    }

    init() {
        this.register();
        this.app = createApp({
            render() {
                return h(RootApp)
            },
        });
        this.boot();
        this.app.mount('#app');
        this.fireCallback("onInit");
        return this.instance();
    }

    register() {
        this.initModules();
        this.endPointsInstance.init(this.endPoints(this));
        require('./src/utils/bus');
        this.fireCallback("onRegister");
    }

    boot() {
        this.useModules();
        this.useMixins();
        this.resolveComponents();
        this.bindGlobalProperties();
        this.fireCallback("onBoot");
    };

    bindGlobalProperties() {
        let global = this.getGlobalProperties();
        Object.entries(global).forEach(([key, value]) => this.app.provide(key, value));
        this.app.config.globalProperties = {...this.app.config.globalProperties, ...global};
    }

    getGlobalProperties() {
        return {
            $axiosInstance: this.axiosInstance,
            $bus: window.Bus,
            $i18n: this.$i18n,
            $instance: this,
            $base: this.base,
            $config: this.config,
            $endPoint: (...args) => this.endPointsInstance.route(...args),
        }
    }


    useModules() {
        this.modules.forEach((module) => this.instance().use(module));
        // this.instance().use(import( 'v-viewer'))
        this.app.use(VueViewer);
        console.log('useeeeeee', this.config?.app?.map ?? {});
        this.app.use(VueGoogleMaps , this.config?.app?.map ?? {});
    }

    resolveComponents() {
        Object.entries(this.components).forEach(([key, value]) => this.instance().component(key, value));
    }

    useMixins() {
        this.mixins.forEach((mixin) => this.app.mixin(mixin));
    }

    initRouter() {
        this.modules.push(initRouter(this.routes, this.base));
    }

    initModules() {
        this.initHead();
        this.initRouter();
        this.initStore();
        this.initI18n();
        this.initEndPoints();
        this.initRequests();
    }

    initRequests() {
        this.axiosInstance = initRequests(this.base);
    }

    initStore() {
        this.modules.push(initStore({}, {base: this.base}));
    }

    initEndPoints() {
        this.endPointsInstance = (new EndPoints(this.base));
    }

    initHead() {
        this.modules.push(initHead());
    }

    initI18n() {
        this.$i18n = initI18n(this.i18n, {...this.config.app, base: this.base});
        this.modules.push(this.$i18n);
    }

    instance() {
        return this.app;
    }

    fireCallback(callbackName) {
        let callback = this.callbacks?.[callbackName];
        return callback instanceof Function ? callback(this) : null;
    }

    sanitizeMixins(mixins) {
        return this.mixins.concat(mixins);
    }

    sanitizeI18n(i18n) {
        this.i18n = i18n;
    }

    sanitizeComponents(components) {
        this.components = {
            ...this.components,
            ...components
        };
        // console.log('sanitizeComponents', this.components);
    }
}