<script setup >
  import { watch ,ref,inject ,computed,reactive} from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useStorage } from '@vueuse/core'
  import {useStore} from 'vuex'

  import { activePanel } from '../../../state/activePanelState'

import  useCountry from "../../../composable/useCountry";
const {countries, country,defaultCountry ,countryObject} = useCountry();
</script>

<template>
  <div
          id="languages-panel"
          :class="[activePanel === 'countries' && 'is-active']"
          class="right-panel-wrapper is-languages"
  >
    <div class="panel-overlay" @click="activePanel = 'none'"></div>

    <div class="right-panel">
      <div class="right-panel-head">
        <h3> {{ trans('select_country') }}</h3>
        <a class="close-panel" @click="activePanel = 'none'">
          <!--<i-->
          <!--aria-hidden="true"-->
          <!--class="iconify"-->
          <!--data-icon="feather:chevron-right"-->
          <!--&gt;</i>-->
          <Icon icon="feather:chevron-right"/>

        </a>
      </div>
      <div class="right-panel-body has-slimscroll">
        <div class="languages-boxes">
            <div v-for="item in countries" class="language-box">
                <div class="language-option">
                    <input v-model="country"
                           type="radio"
                           name="countries_selection"
                           :value="item.value"
                           :checked="item.value == defaultCountry"
                    />
                    <div class="language-option-inner">
                        <img :src="item.icon_url" alt=""/>
                        <div class="indicator">
                            <Icon icon="feather:check" class="iconify"></Icon>

                        </div>
                    </div>
                </div>
            </div>

          <!--<div class="language-box">-->
            <!--<div class="language-option">-->
              <!--<input-->
                      <!--v-model="country"-->
                      <!--type="radio"-->
                      <!--name="language_selection"-->
                      <!--value="fr"-->
              <!--/>-->
              <!--<div class="language-option-inner">-->
                <!--<img src="/images/icons/flags/france.svg" alt="" />-->
                <!--<div class="indicator">-->
                  <!--<Icon icon="feather:check"   class="iconify"></Icon>-->

                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->

          <!--<div class="language-box">-->
            <!--<div class="language-option">-->
              <!--<input-->
                      <!--v-model="country"-->
                      <!--type="radio"-->
                      <!--name="language_selection"-->
                      <!--value="es"-->
              <!--/>-->
              <!--<div class="language-option-inner">-->
                <!--<img src="/images/icons/flags/spain.svg" alt="" />-->
                <!--<div class="indicator">-->
                  <!--<Icon icon="feather:check"   class="iconify"></Icon>-->

                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->

          <!--<div class="language-box">-->
            <!--<div class="language-option">-->
              <!--<input-->
                      <!--v-model="country"-->
                      <!--type="radio"-->
                      <!--name="language_selection"-->
                      <!--value="de"-->
              <!--/>-->
              <!--<div class="language-option-inner">-->
                <!--<img src="/images/icons/flags/germany.svg" alt="" />-->
                <!--<div class="indicator">-->
                  <!--<Icon icon="feather:check"   class="iconify"></Icon>-->

                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->

          <!--<div class="language-box">-->
            <!--<div class="language-option">-->
              <!--<input-->
                      <!--v-model="country"-->
                      <!--type="radio"-->
                      <!--name="language_selection"-->
                      <!--value="es-MX"-->
              <!--/>-->
              <!--<div class="language-option-inner">-->
                <!--<img src="/images/icons/flags/mexico.svg" alt="" />-->
                <!--<div class="indicator">-->
                  <!--<Icon icon="feather:check"   class="iconify"></Icon>-->

                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->

          <!--<div class="language-box">-->
            <!--<div class="language-option">-->
              <!--<input-->
                      <!--v-model="country"-->
                      <!--type="radio"-->
                      <!--name="language_selection"-->
                      <!--value="zh-CN"-->
              <!--/>-->
              <!--<div class="language-option-inner">-->
                <!--<img src="/images/icons/flags/china.svg" alt="" />-->
                <!--<div class="indicator">-->
                  <!--<Icon icon="feather:check"   class="iconify"></Icon>-->

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
