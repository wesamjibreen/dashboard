// import {createApp, h} from 'vue';
import { components, EndPoints, initHead, initI18n, initRouter, initStore, mixins } from "./modules";
// import RootApp from "./src/RootApp.vue";
import initRequests from "./src/axios";
import VueGoogleMaps from '@fawmi/vue-google-maps'
import { Datepicker, Inputitems, Pagination, Sidebar, Timepicker, Modal, Upload, Field, Icon } from '@oruga-ui/oruga-next'
import VueViewer from 'v-viewer'
import { createApp } from "./app";
import VTooltip from 'v-tooltip'

import { Select , Spin} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

export default class App {
    mixins = mixins;
    components = components;
    modules = [];

    constructor({ base, routes, endPoints, config, i18n = {}, components = {}, mixins = [] }, callbacks = {}, options) {
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
        // this.app = createApp({
        //     render() {
        //         return h(RootApp)
        //     },
        // });\


        let instance = createApp({
            modules: this.modules,
            async enhanceApp(app) {
                // this.app = app;
                // import CKE from '@ckeditor/ckeditor5-vue'
                // import input from "../mixins/input"
                // import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
                // const CKE = (await import('@ckeditor/ckeditor5-vue')).default;
                // const ClassicEditor = (await import('@ckeditor/ckeditor5-build-classic')).default;
                // const CKEditor = CKE.component;
                // console.log('CKEditor',CKEditor);
                // app.component(CKEditor, {editor: ClassicEditor})


                // alert('TextareaField')
                // const formBuilder = (await import('./src/components/formBuilder')).default;
                // Object.entries(formBuilder).forEach(([key, value]) => app.component(key, value));

                // console.log('formBuilder', formBuilder);
                // const MapField = (await import('./src/components/formBuilder/fields/MapField.vue')).default;
                // const EditorField = (await import('./src/components/formBuilder/fields/EditorField.vue')).default;
                // const CrudField = (await import('./src/components/formBuilder/fields/Crud/Index.vue')).default;
                // app.component(MapField);
                // app.component(EditorField);
                // app.component(CrudField);
                // app.use(CKE, {
                //     editor: ClassicEditor
                // });
                // const VCalendar = (await import('v-calendar')).default
                // const VueMultiselect = (await import('@vueform/multiselect')).default
                // const VueSlider = (await import('@vueform/slider')).default
                // const VueTippy = (await import('vue-tippy')).default
                //
                // const hasNestedRouterLink = (
                //     await import('./directives/has-nested-router-link')
                // ).default
                // const background = (await import('./directives/background')).default
                // const tooltip = (await import('./directives/tooltip')).default
                //
                // app.use(VCalendar)
                // app.use(VueTippy, {
                //     defaultProps: {
                //         theme: 'light',
                //     },
                // })
                //
                // app.component(VueMultiselect.name, VueMultiselect)
                // app.component(VueSlider.name, VueSlider)
                //
                // app.directive('has-nested-router-link', hasNestedRouterLink)
                // app.directive('background', background)
                // app.directive('tooltip', tooltip)
            },
        }).then(async ({ app, router }) => {
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
            'lazy'
        );

        await register(formBuilder, app);

        // const list = await require.context(
        //     './src/components/list/',
        //     true,
        //     /[A-Z]\w+\.(vue|js)$/,
        //     'lazy'
        // );
        // await register(list, app);


        // await requireCallback(
        //     app,     // The relative path of the components folder
        //     './src/components/list/',
        //     true,
        //     /[A-Z]\w+\.(vue|js)$/,
        //     'lazy'
        // );
        // const requireComponent = await require.context(
        //     // The relative path of the components folder
        //     './src/components/formBuilder/fields/',
        //     // Whether or not to look in subfolders
        //     true,
        //     // The regular expression used to match base component filenames
        //     /[A-Z]\w+\.(vue|js)$/,
        //
        //     'lazy'
        // );
        // console.log('requireComponent', requireComponent.keys());
        //
        // requireComponent.keys().forEach(async fileName => {
        //     const componentName = _.upperFirst(
        //         _.camelCase(
        //             fileName.split('/').pop().replace(/\.\w+$/, '')
        //         )
        //     );
        //     const componentConfig = await requireComponent(fileName);
        //     app.component(componentName, componentConfig.default || componentConfig)
        // })

        // await asyncRegisterComponent({
        //     name: "CrudField",
        //     path: "./src/components/formBuilder/fields/Crud/Index.vue"
        // }, app);
        // await asyncRegisterComponent({
        //     path: "./src/components/formBuilder/fields/EditorField.vue",
        //     name: "EditorField"
        // }, app);

        // const EditorField = (await import("./src/components/formBuilder/fields/EditorField.vue")).default;
        // app.component(EditorField);

        // const CrudField = (await import("./src/components/formBuilder/fields/Crud/Index.vue")).default;
        // app.component(CrudField);
        //
        // const RepeaterField = (await import("./src/components/formBuilder/fields/Repeater/Index.vue")).default;
        // app.component(RepeaterField);
        //
        // const CheckboxField = (await import("./src/components/formBuilder/fields/CheckboxField.vue")).default;
        // app.component(CheckboxField);
        //
        // const MapField = (await import("./src/components/formBuilder/fields/MapField.vue")).default;
        // app.component(MapField);
        //
        // const RadioField = (await import("./src/components/formBuilder/fields/RadioField.vue")).default;
        // app.component(RadioField);
        //
        // // const EditorField = (await import("./src/components/formBuilder/fields/EditorField.vue")).default;
        // // app.component(EditorField);
        //
        // const ColorField = (await import("./src/components/formBuilder/fields/ColorField.vue")).default;
        // app.component(ColorField);
        //
        // const DateField = (await import("./src/components/formBuilder/fields/DateField.vue")).default;
        // app.component(DateField);
        //
        // const ImageField = (await import("./src/components/formBuilder/fields/ImageField.vue")).default;
        // app.component(ImageField);
        //
        // const TimeField = (await import("./src/components/formBuilder/fields/TimeField.vue")).default;
        // app.component(TimeField);
        //
        // const FileField = (await import("./src/components/formBuilder/fields/FileField.vue")).default;
        // app.component(FileField);
        //
        // const InputField = (await import("./src/components/formBuilder/fields/InputField.vue")).default;
        // app.component(InputField);
        //
        // const SelectField = (await import("./src/components/formBuilder/fields/SelectField.vue")).default;
        // app.component(SelectField);
        //
        // const TagsField = (await import("./src/components/formBuilder/fields/TagsField.vue")).default;
        // app.component(TagsField);
        //
        // const SwitchField = (await import("./src/components/formBuilder/fields/SwitchField.vue")).default;
        // app.component(SwitchField);
        //
        // const TextareaField = (await import("./src/components/formBuilder/fields/TextareaField.vue")).default;
        // app.component(TextareaField);
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
        this.app.config.globalProperties = { ...this.app.config.globalProperties, ...global };
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
        this.app.use(VueViewer);
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
        this.app.use(VTooltip);
        this.app.use(VTooltip);
        this.app.use(Select);
        this.app.use(Spin);
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
        this.modules.push(initStore({}, { base: this.base }));
    } 18

    initEndPoints() {
        this.endPointsInstance = (new EndPoints(this.base));
    }

    initHead() {
        this.modules.push(initHead());
    }

    initI18n() {
        this.$i18n = initI18n(this.i18n, { ...this.config.app, base: this.base });
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
