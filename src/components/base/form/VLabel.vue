<script setup>
import {useVFieldContext} from '../../../composable/useVFieldContext'
import {computed, reactive} from "vue";

// export interface VLabelProps {
//   raw?: boolean
// }

const props = defineProps({
    forId : "",
    raw: false
});

const vFieldContext = reactive(
    useVFieldContext({
        create: false,
        help: 'VLabel',
    })
)

const classes = computed(() => {
    if (props.raw) return []
    return ['label']
})

const onEnter = () => {
    if (vFieldContext.id) {
        document.getElementById(vFieldContext.id)?.click()
    }
}
</script>

<template>
    <label :class="classes"
        :for="forId"
        role="button"
        tabindex="0"
        @keydown.enter.prevent="onEnter"
    >
        <slot />
    </label>
</template>
