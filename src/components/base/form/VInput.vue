<script setup>
import {useVFieldContext} from '../../../composable/useVFieldContext'
import {computed, reactive, ref,watch} from "vue";

// export interface VInputEmits {
//   (event: 'update:modelValue', value?: any): void
// }
// export interface VInputProps {
//   raw?: boolean
//   modelValue?: any
//   trueValue?: boolean
//   falseValue?: boolean
// }
console.log("useVFieldContext", useVFieldContext({
    create: false,
    help: 'VInput',
}))

const vFieldContext = reactive(
  useVFieldContext({
    create: false,
    help: 'VInput',
  })
)
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: '',
    trueValue: true,
    falseValue: false,
});
const value = ref(vFieldContext.field?.value ?? props.modelValue)

watch(value, () => {
  emits('update:modelValue', value.value)
})
watch(
  () => props.modelValue,
  () => {
    value.value = props.modelValue
  }
)

const classes = computed(() => {
  if (props.raw) return []

  return ['input', 'v-input']
})
</script>

<template>
  <input
    :id="vFieldContext.id"
    v-model="value"
    :class="classes"
    :name="vFieldContext.id"
    :true-value="props.trueValue"
    :false-value="props.falseValue"
    @change="vFieldContext.field?.handleChange"
    @blur="vFieldContext.field?.handleBlur"
  />
</template>
