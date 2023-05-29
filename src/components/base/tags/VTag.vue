<script >
// export type VTagColor =
//   | 'primary'
//   | 'secondary'
//   | 'info'
//   | 'success'
//   | 'warning'
//   | 'danger'
//   | 'orange'
//   | 'blue'
//   | 'green'
//   | 'purple'
//   | 'white'
//   | 'light'
//   | 'solid'
//
// export interface VTagProps {
//   label?: string | number
//   color?: VTagColor
//   rounded?: boolean
//   curved?: boolean
//   outlined?: boolean
//   elevated?: boolean
//   remove?: boolean
// }

export default {
    props : {
        label: String,
        color: String,
        rounded: Boolean,
        curved: Boolean,
        outlined: Boolean,
        remove: Boolean,
        elevated: Boolean,
    }
}
</script>

<template>
    <small
        class="tag"
        :class="[
      color && 'is-' +( color ?? 'primary'),
      rounded && 'is-rounded',
      curved && 'is-curved',
      outlined && 'is-outlined',
      elevated && 'is-elevated',
      remove && 'is-delete',
    ]"
    >{{ label }}</small
    >
</template>
