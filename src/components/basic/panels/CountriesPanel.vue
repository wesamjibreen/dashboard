<script>
    // import { watch ,ref,inject ,computed,reactive} from 'vue'
    // import { useI18n } from 'vue-i18n'
    // import { useStorage } from '@vueuse/core'
    // import {useStore} from 'vuex'

    import {activePanel} from '../../../state/activePanelState'
    import useCountry from "../../../composable/useCountry";

    export default {
        setup() {
            // const {countries, country, defaultCountry, countryObject,isChecked} = useCountry();
            return {
                ...useCountry(),
                activePanel
            }
        },
        methods: {
            onUpdate(...args) {
                const onUpdate = _.get(this, '$config.app.countries.onUpdate', null);
                if (onUpdate instanceof Function)
                    onUpdate.bind(this)(...args);
            }
        }
    }


</script>

<template>
    <div id="languages-panel"
         :class="[activePanel === 'countries' && 'is-active']"
         class="right-panel-wrapper is-languages">
        <div class="panel-overlay" @click="activePanel = 'none'"></div>

        <div class="right-panel">
            <div class="right-panel-head">
                <h3> {{ trans('select_country') }}</h3>
                <a class="close-panel" @click="activePanel = 'none'">
                    <Icon icon="feather:chevron-right"/>
                </a>
            </div>
            <div class="right-panel-body has-slimscroll">
                <div class="languages-boxes">
                    <div v-for="item in countries" class="language-box">
                        <div class="language-option" @click="onUpdate(item)">
                            <input v-model="country"
                                   type="radio"
                                   name="countries_selection"
                                   :value="item.value"
                                   :checked="isChecked(item)"
                            />
                            <div class="language-option-inner">
                                <img :src="item.icon_url" alt=""/>
                                <div class="indicator">
                                    <Icon icon="feather:check" class="iconify"></Icon>
                                </div>
                            </div>
                        </div>
                    </div>
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
