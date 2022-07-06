<script>
// import { watch ,ref,inject ,computed,reactive} from 'vue'
// import { useI18n } from 'vue-i18n'
// import { useStorage } from '@vueuse/core'
// import {useStore} from 'vuex'

import { activePanel } from "../../../state/activePanelState";
// import useCountry from "../../../composable/useCountry";
import useDeterminant from "../../../composable/useDeterminant";
import { onMounted, computed } from "vue";

export default {
  setup() {
    // const {countries, country, defaultCountry, countryObject,isChecked} = useCountry();

    const determinants = useDeterminant();

    return {
      determinants,
      // ...useCountry(),
      activePanel,
    };
  },
  methods: {},
};
</script>

<template>
  <div
    id="languages-panel"
    :class="[activePanel === 'determinants' && 'is-active']"
    class="right-panel-wrapper is-languages"
  >
    <div class="panel-overlay" @click="activePanel = 'none'"></div>
    <div class="right-panel">
      <div class="right-panel-head">
        <h3>{{ trans(`select_${determinants?.model.value}`) }}</h3>
        <a class="close-panel" @click="activePanel = 'none'">
          <Icon icon="feather:chevron-right" />
        </a>
      </div>

      <div class="right-panel-body has-slimscroll">
        <div class="languages-boxes">
          <div
            v-for="(determinant, index) in determinants?.determinants.value"
            class="language-box"
            :key="index"
          >
            <div
              class="language-option"
              @click="determinants.onDeterminantChange(determinant)"
            >
              <input
                type="radio"
                name="countries_selection"
                :checked="determinants.isChecked(determinant.key)"
              />
              <div class="language-option-inner">
                <img
                  :src="determinant.value"
                  alt=""
                  v-if="determinants.component.value === 'image'"
                />
                <h3 v-else>
                  {{ determinant.value }}
                </h3>
                <div class="indicator">
                  <Icon icon="feather:check" class="iconify"></Icon>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="img-wrap has-text-centered">
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
        </div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../../scss/abstracts/_mixins.scss";
@import "../../../scss/layout/_right-panel.scss";
</style>
