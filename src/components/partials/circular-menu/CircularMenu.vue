<script setup>
import { useWindowScroll } from "@vueuse/core";
import { computed, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import useNotifications from "../../../composable/useNotifications";
import useDeterminant from "../../../composable/useDeterminant";

const determinants = useDeterminant();
const notifications = useNotifications();
const { locale } = useI18n();
const { y } = useWindowScroll();
const isOpen = ref(false);
const isScrolling = ref(false);

const determinantValue = ref(determinants.determinant?.value?.value);
window.Bus.on("on-determinant-change", (det) => {
  determinantValue.value = det.value;
});

watchEffect(() => {
  if (y.value <= 30) {
    isOpen.value = false;
  }

  isScrolling.value = y.value > 30;
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
  <div
    id="circular-menu"
    :class="[isScrolling && 'is-active', isOpen && 'active']"
    class="circular-menu"
  >
    <a class="floating-btn" @click="isOpen = !isOpen">
      <i aria-hidden="true" class="fas fa-bars"></i>
      <i aria-hidden="true" class="fas fa-times"></i>
    </a>

    <div class="items-wrapper">
      <div class="menu-item is-flex">
        <label class="dark-mode">
          <input
            type="checkbox"
            :checked="!isDark"
            @change="toggleDarkModeHandler"
          />
          <span></span>
        </label>
      </div>

      <a class="menu-item is-flex" @click="activePanel = 'languages'">
        <Icon icon="grommet-icons:language" />
      </a>

      <!-- <a
        v-if="!!providerConfig"
        class="menu-item is-flex right-panel-trigger"
        @click="activePanel = 'countries'"
      >
        <img :src="flagUrl" alt="" />
      </a> -->

      <a
        v-if="!!determinants.component?.value"
        class="menu-item is-flex right-panel-trigger"
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

      <RouterLink
        v-if="notifications.config.display"
        :to="{ name: 'dashboard' }"
        class="menu-item is-flex"
      >
        <Icon class="iconify" icon="feather:bell"></Icon>
      </RouterLink>
    </div>
  </div>
</template>
