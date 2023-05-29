<script>
// import { CssUnitRe } from '/@src/utils/regex'

export default {
    props: {
        width: {
            default: "100%"
        },
        height: {
            default: "10px"
        },
        disabled: Boolean,
        centered: Boolean,
    },
    setup(props) {
        return {
            props
        }
    }
}
// if (props.width.match(CssUnitRe) === null) {
//   console.warn(
//     `VPlaceload: invalid "${props.width}" width. Should be a valid css unit value.`
//   )
// }
// if (props.height.match(CssUnitRe) === null) {
//   console.warn(
//     `VPlaceload: invalid "${props.height}" height. Should be a valid css unit value.`
//   )
// }
</script>

<template>
    <div class="content-shape" :class="[props.centered && 'is-centered', !props.disabled && 'loads']"></div>
</template>

<style scoped>
.content-shape {
    width: v-bind('props.width');
    height: v-bind(height);
}
</style>
