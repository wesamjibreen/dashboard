<template>
    <component :is="layout">
        <RouterView v-slot="{ Component }">
            <transition name="fade">
                <component :is="Component"/>
            </transition>
        </RouterView>
    </component>
</template>

<script>
    import AuthLayout from "./AuthLayout";
    import AppLayout from "./AppLayout";
    import {computed, inject, reactive} from "vue";
    import {useHead} from "@vueuse/head";
    import {useRoute} from "vue-router";
    import {useI18n} from 'vue-i18n';
    import {SET_COUNTRIES, SET_LANGUAGES} from "../store/modules/setting.module";

    import {useStore} from 'vuex';

    export default {
        name: "BaseLayout",
        setup(props, {attrs}) {
            const config = inject('$config');   // injecting variable in setup
            // const base = inject('$base');   // injecting variable in setup
            // let token = useStorage(getTokenKey(base), null);

            const store = useStore();

            //
            // const AppLayout = defineComponent(AppLayout);
            // const AuthLayout = defineComponent(AuthLayout);
            let i18n = useI18n();
            let title = i18n.t('app_name') ?? _.get(config, 'app.name', "");
            // console.log('$config',base, config);

            // let title = "";
            const siteData = reactive({
                title: title,
            });

            let route = useRoute();

            useHead({
                // Can be static or computed
                title: computed(() => `${siteData.title} - ${i18n.t(route.name)}`),
                meta: [],
            });


            const isAuthenticated = computed(() => {
                return _.get(store, 'state.auth.isAuthenticated', false);
            });

            const layout = computed(() => {
                return isAuthenticated.value ? "AppLayout" : "AuthLayout";
            });
            // Bus.on('authenticated', ({data}) => {
            //     token.value = data.access_token;
            // });
            //
            // Bus.on('logout', () => {
            //     token.value = null;
            // });

            return {
                AppLayout,
                AuthLayout,
                isAuthenticated,
                layout
            }
        },
        components: {
            AppLayout,
            AuthLayout,
        },
        created() {
            this.initLanguages();
            this.initCountries();
        },
        methods: {
            initLanguages() {
                let data$ = this.appConfig('language.data');
                switch (typeof data$) {
                    case 'function' :
                        let callback = data$.bind(this).call();
                        if (callback instanceof Promise)
                            callback.then((data) => {
                                this.$store.commit(`setting/${SET_LANGUAGES}`, data);
                            });
                        else if (callback instanceof Array)
                            this.$store.commit(`setting/${SET_LANGUAGES}`, callback);
                        break;

                    default :
                        return this.$store.commit(`setting/${SET_LANGUAGES}`, data$);
                }

                // let callback = this.appConfig('language.data');
                // let languages = [];
                // if (callback instanceof Function)
                //     languages = callback();
                // else
                //     languages = [
                //         {
                //             symbol: "AR",
                //             locale: "ar",
                //             label: 'العربية',
                //             flag: "/images/icons/flags/germany.svg"
                //         },
                //     ];

                // this.$store.commit(`setting/${SET_LANGUAGES}`, languages);
            },
            initCountries() {
                let data$ = this.appConfig('countries.data');
                switch (typeof data$) {
                    case 'function' :
                        let callback = data$.bind(this).call();
                        if (callback instanceof Promise)
                            callback.then((data) => {
                                this.$store.commit(`setting/${SET_COUNTRIES}`, data);
                            });
                        else if (callback instanceof Array)
                            this.$store.commit(`setting/${SET_COUNTRIES}`, callback);
                        break;

                    default :
                        return this.$store.commit(`setting/${SET_COUNTRIES}`, data$);
                }
            }
        },
        watch: {
            layout(newVal) {
                if (newVal !== "AppLayout")
                    return;

                this.initCountries();
            }
        }
    }
</script>

<style>
    @import '~notyf/notyf.min.css';
</style>