<script setup>
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import { isDark, toggleDarkModeHandler } from "../../../state/darkModeState";
import { activePanel } from "../../../state/activePanelState";
import useDropdown from "../../../composable/useDropdown";

const { locale } = useI18n();
const dropdownElement = ref();
const dropdown = useDropdown(dropdownElement);
// import  useCountry from "../../../composable/useCountry";
// const {countries, country,defaultCountry ,countryObject,flagUrl,providerConfig} = useCountry();

import useDeterminant from "../../../composable/useDeterminant";
const determinants = useDeterminant();

const determinantValue = ref(determinants.determinant?.value?.value);
window.Bus.on("on-determinant-change", (det) => {
  determinantValue.value = det.value;
});

const localFlagSrc = computed(() => {
  switch (locale.value) {
    case "fr":
      return "/images/icons/flags/france.svg";
    case "es":
      return "/images/icons/flags/spain.svg";
    case "es-MX":
      return "/images/icons/flags/mexico.svg";
    case "de":
      return "/images/icons/flags/germany.svg";
    case "zh-CN":
      return "/images/icons/flags/china.svg";
    case "en":
    default:
      return "/panel/images/icons/flags/united-states-of-america.svg";
  }
});
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

    <!-- <a  v-if="!!providerConfig" class="toolbar-link right-panel-trigger"
      @click="activePanel = 'countries'">

      <img :src="flagUrl" alt="" />
    </a> -->
    <a :class="`toolbar-link toolbar-link right-panel-trigger ${determinants.component?.value==='image'?'lang-image':'lang-label'}`"
      v-if="!!determinants.component?.value"
      @click="activePanel = 'determinants'"
    >
      <img
        :src="determinantValue"
        v-if="determinants.component.value === 'image'"
      />
      <div v-else-if="determinants.component.value === 'label'">
        <h3>{{ determinantValue }}</h3>
      </div>
    </a>

    <slot></slot>
  </div>
</template>


<style>
    .toolbar-link.lang-label{
        width: auto;
        border-radius: 4px;
        height: auto;
        padding: 2px 12px;
        margin: 0;
        border: 1px solid #d7d7d7;
    }
</style>
