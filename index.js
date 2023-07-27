import {components, EndPoints, initHead, initI18n, initRouter, initStore, mixins} from "./modules";
import initRequests from "./src/axios";
import VueGoogleMaps from '@fawmi/vue-google-maps'
import {Datepicker, Inputitems, Pagination, Sidebar, Timepicker, Modal, Upload, Field, Icon} from '@oruga-ui/oruga-next'
import {createApp} from "./app";
import VTooltip from 'v-tooltip'

import {DatePicker, Select, Spin, Image, Menu} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

export default class App {
    mixins = mixins;
    components = components;
    modules = [];

    constructor({base, routes, endPoints, config, i18n = {}, components = {}, mixins = []}, callbacks = {}, options) {
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
        let instance = createApp({
            modules: this.modules,
            async enhanceApp(app) {
            },
        }).then(async ({app, router}) => {
            // alert('then')
            this.app = app;
            this.boot();

            await router.isReady();
            this.load(app);

            app.mount('#app');
        });
        this.app = instance.app;
        // this.app.mount('#app');
        this.fireCallback("onInit");
        return this.instance();
    }

    async load(app) {
        const register = async function (requireComponent, app) {
            requireComponent.keys().forEach(async fileName => {
                const componentName = _.upperFirst(
                    _.camelCase(
                        fileName.split('/').pop().replace(/\.\w+$/, '')
                    )
                );
                const componentConfig = await requireComponent(fileName);
                app.component(componentName, componentConfig.default || componentConfig)
            })
        };

        const formBuilder = await require.context(
            './src/components/formBuilder/fields/',
            true,
            /[A-Z]\w+\.(vue|js)$/,
            // 'lazy'
        );

        await register(formBuilder, app);
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
        // console.log('useModules',this.$i18n)
        this.modules.forEach((module) => this.instance().use(module));
        this.app.use(this.$i18n);
        this.app.use(VueGoogleMaps, this.config?.app?.map ?? {});
        this.app.use(Datepicker);
        this.app.use(Inputitems, {
            iconPack: "fa"
        });
        this.app.use(Timepicker);
        this.app.use(Pagination);
        this.app.use(Sidebar);
        this.app.use(Modal);
        this.app.use(Upload);
        this.app.use(Field);
        this.app.use(Icon);

        [VTooltip, Select, Spin, DatePicker, Image, Menu].forEach((component) => this.app.use(component));
    }

    resolveComponents() {
        Object.entries(this.components).forEach(([key, value]) => this.instance().component(key, value));
    }

    useMixins() {
        this.mixins.forEach((mixin) => this.app.mixin(mixin));
    }

    initRouter() {
        this.modules.push(initRouter(this.routes, this.base, this.config));
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
    }
}
