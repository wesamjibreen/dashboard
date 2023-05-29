<script>
// import { CssUnitRe } from '/@src/utils/regex'

// export interface VPlaceloadTextProps {
//   width?: string
//   lastLineWidth?: string
//   lines?: number
//   disabled?: boolean
//   centered?: boolean
// }

import VPlaceload from "./VPlaceload.vue";


export default {
    components: {
        VPlaceload
    },
    props: {
        width: {
            default: "100%"
        },
        lastLineWidth: {
            default: "100%"
        },
        lines: {
            type: Number,
            default: 2
        },
        centered: Boolean,
        disabled: Boolean,
    },
    setup(props) {
        return {
            props
        };
    }
}
// if (props.width.match(CssUnitRe) === null) {
//   console.warn(
//     `VPlaceloadText: invalid "${props.width}" width. Should be a valid css unit value.`
//   )
// }
// if (props.lastLineWidth.match(CssUnitRe) === null) {
//   console.warn(
//     `VPlaceloadText: invalid "${props.lastLineWidth}" lastLineWidth. Should be a valid css unit value.`
//   )
// }
</script>

<template>
    <div class="content-shape-group">
        <VPlaceload
            v-for="line of (props.lines?? 2) - 1"
            :key="line"
            :width="props.width"
            :centered="props.centered"
        />
        <VPlaceload :width="props.lastLineWidth" :centered="props.centered"/>
    </div>
</template>
