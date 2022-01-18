<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { isDark, toggleDarkModeHandler } from '../../../state/darkModeState'
import { activePanel } from '../../../state/activePanelState';
import useDropdown from '../../../composable/useDropdown'

const { locale } = useI18n()
const dropdownElement = ref()
const dropdown = useDropdown(dropdownElement)
import  useCountry from "../../../composable/useCountry";
const {countries, country,defaultCountry ,countryObject,flagUrl} = useCountry();
const localFlagSrc = computed(() => {
  switch (locale.value) {
    case 'fr':
      return '/images/icons/flags/france.svg'
    case 'es':
      return '/images/icons/flags/spain.svg'
    case 'es-MX':
      return '/images/icons/flags/mexico.svg'
    case 'de':
      return '/images/icons/flags/germany.svg'
    case 'zh-CN':
      return '/images/icons/flags/china.svg'
    case 'en':
    default:
      return '/panel/images/icons/flags/united-states-of-america.svg'
  }
})
</script>

<template>
  <div class="toolbar ml-auto">
    <div class="toolbar-link">
      <label class="dark-mode ml-auto">
        <input
          type="checkbox"
          :checked="!isDark"
          @change="toggleDarkModeHandler"
        />
        <span></span>
      </label>
    </div>

    <a class="toolbar-link right-panel-trigger"
      @click="activePanel = 'countries'">

      <img :src="flagUrl" alt="" />
    </a>

    <slot></slot>
  </div>
</template>
