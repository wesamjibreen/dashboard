<script setup >
import { computed ,defineComponent} from 'vue'

// export interface VIconProps {
//   icon: string
// }

const props = defineProps()
import {Icon} from '@iconify/vue';

defineComponent(Icon)
const isIconify = computed(() => {
  return props.icon && props.icon.indexOf(':') !== -1
})
</script>

<template>
  <span :key="props.icon">
    <Icon
      v-if="isIconify"
      aria-hidden="true"
      class="iconify"
      :data-icon="props.icon"
      :icon="props.icon"
    ></Icon>
    <i v-else aria-hidden="true" :class="props.icon"></i>
  </span>
</template>
