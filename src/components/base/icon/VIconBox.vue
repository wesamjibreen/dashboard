<script setup>
// export type VIconBoxSize = 'small' | 'medium' | 'large' | 'big' | 'xl'
// export type VIconBoxColor =
//   | 'primary'
//   | 'info'
//   | 'success'
//   | 'warning'
//   | 'danger'
//   | 'purple'
//   | 'yellow'
//   | 'orange'
//   | 'green'
//   | 'red'
//   | 'blue'
// export interface VIconProps {
//   size?: VIconBoxSize
//   color?: VIconBoxColor
//   rounded?: boolean
//   bordered?: boolean
// }

const props = defineProps({
    size: undefined,
    color: undefined,
    rounded: false,
    bordered: false,
});

</script>

<template>
    <div class="v-icon" :class="[
      props.size && 'is-' + (props.size ?? 'small'),
      props.color && 'is-' + (  props.color ?? 'primary'),
      props.rounded && 'is-rounded',
      props.bordered && 'is-bordered',
    ]">
        <slot></slot>
    </div>
</template>
