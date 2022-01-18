<script setup>
    import {computed, inject, ref, watch} from 'vue'
    import {useI18n} from 'vue-i18n'
    import {useStorage} from '@vueuse/core'
    import {useStore} from 'vuex'

    import { activePanel } from '../../../state/activePanelState'
    import { useViaPlaceholderError } from '../../../composable/useViaPlaceholderError'

    const {locale, t} = useI18n();

    const store = useStore();

    const base = inject('$base');
    /**
     * We use the same storage key as we use in the /src/i18n.ts file
     * so if user reload the page, the selected language will be the same
     */
    const defaultLocale = useStorage(`${base}_locale`, navigator.language || 'en');

    const languages = _.get(store, 'state.setting.languages', []);


    const language = computed(() => {
        return _.find(languages, {locale: locale.value})
    });

    const dir = computed(() => {
        return language.value.dir || (locale.value === "ar" ? "rtl" : "ltr")
    });

    const setDirection = (direction) => {
        document.querySelector("body").setAttribute("dir", direction);
        document.querySelector("html").setAttribute("dir", direction);
    };

    setDirection(dir.value);
    /**
     * Each time we change the locale, we persit it in the storage
     */
    watch(locale, () => {
        setDirection(dir.value);
        defaultLocale.value = locale.value
    });




    // type TabId = 'team' | 'projects' | 'schedule'
    const activeTab = ref('team')
</script>

<template>
    <div id="activity-panel" :class="[activePanel === 'languages' && 'is-active']"
         class="right-panel-wrapper  is-languages">
        <div class="panel-overlay" @click="activePanel = 'none'"></div>
        <div class="right-panel">
            <div class="right-panel-head">
                <h3>{{ trans('select_language') }}</h3>
                <a class="close-panel" @click="activePanel = 'none'">
                    <Icon icon="feather:chevron-right"></Icon>
                </a>
            </div>


            <div class="right-panel-body has-slimscroll">
                <div class="languages-boxes">
                    <div class="language-box" v-for="language in languages">
                        <div class="language-option">
                            <input v-model="locale"
                                   type="radio"
                                   name="language_selection"
                                   :value="language.locale"
                                   :checked="language.locale === locale"/>
                            <div class="language-option-inner">
                                <span class="language-span"> {{language.label }} </span>

                                <!--<img-->
                                <!--src="/panel/images/icons/flags/united-states-of-america.svg"-->
                                <!--alt=""-->
                                <!--/>-->
                                <div class="indicator">
                                    <Icon icon="feather:check" class="iconify"></Icon>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--<div class="language-box">-->
                    <!--<div class="language-option">-->
                    <!--<input-->
                    <!--v-model="locale"-->
                    <!--type="radio"-->
                    <!--name="language_selection"-->
                    <!--value="fr"-->
                    <!--/>-->
                    <!--<div class="language-option-inner">-->
                    <!--<img src="/images/icons/flags/france.svg" alt=""/>-->
                    <!--<div class="indicator">-->
                    <!--<i-->
                    <!--aria-hidden="true"-->
                    <!--class="iconify"-->
                    <!--data-icon="feather:check"-->
                    <!--&gt;</i>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->

                    <!--<div class="language-box">-->
                    <!--<div class="language-option">-->
                    <!--<input-->
                    <!--v-model="locale"-->
                    <!--type="radio"-->
                    <!--name="language_selection"-->
                    <!--value="es"-->
                    <!--/>-->
                    <!--<div class="language-option-inner">-->
                    <!--<img src="/images/icons/flags/spain.svg" alt=""/>-->
                    <!--<div class="indicator">-->
                    <!--<i-->
                    <!--aria-hidden="true"-->
                    <!--class="iconify"-->
                    <!--data-icon="feather:check"-->
                    <!--&gt;</i>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->

                    <!--<div class="language-box">-->
                    <!--<div class="language-option">-->
                    <!--<input-->
                    <!--v-model="locale"-->
                    <!--type="radio"-->
                    <!--name="language_selection"-->
                    <!--value="de"-->
                    <!--/>-->
                    <!--<div class="language-option-inner">-->
                    <!--<img src="/images/icons/flags/germany.svg" alt=""/>-->
                    <!--<div class="indicator">-->
                    <!--<i-->
                    <!--aria-hidden="true"-->
                    <!--class="iconify"-->
                    <!--data-icon="feather:check"-->
                    <!--&gt;</i>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->

                    <!--<div class="language-box">-->
                    <!--<div class="language-option">-->
                    <!--<input-->
                    <!--v-model="locale"-->
                    <!--type="radio"-->
                    <!--name="language_selection"-->
                    <!--value="es-MX"-->
                    <!--/>-->
                    <!--<div class="language-option-inner">-->
                    <!--<img src="/images/icons/flags/mexico.svg" alt=""/>-->
                    <!--<div class="indicator">-->
                    <!--<i-->
                    <!--aria-hidden="true"-->
                    <!--class="iconify"-->
                    <!--data-icon="feather:check"-->
                    <!--&gt;</i>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->

                    <!--<div class="language-box">-->
                    <!--<div class="language-option">-->
                    <!--<input-->
                    <!--v-model="locale"-->
                    <!--type="radio"-->
                    <!--name="language_selection"-->
                    <!--value="zh-CN"-->
                    <!--/>-->
                    <!--<div class="language-option-inner">-->
                    <!--<img src="/images/icons/flags/china.svg" alt=""/>-->
                    <!--<div class="indicator">-->
                    <!--<i-->
                    <!--aria-hidden="true"-->
                    <!--class="iconify"-->
                    <!--data-icon="feather:check"-->
                    <!--&gt;</i>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->
                </div>

                <div class="img-wrap has-text-centered">
                    <img
                            class="light-image"
                            src="/panel/images/illustrations/right-panel/languages.svg"
                            alt=""
                    />
                    <img
                            class="dark-image"
                            src="/panel/images/illustrations/right-panel/languages-dark.svg"
                            alt=""
                    />
                </div>
            </div>


        </div>
    </div>
</template>

<style lang="scss">
    @import '../../../scss/abstracts/_mixins.scss';
    @import '../../../scss/layout/_right-panel.scss';
</style>

