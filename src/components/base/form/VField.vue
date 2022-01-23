<script>
    // export type VFieldProps = {
    //   label?: string
    //   addons?: boolean
    //   textaddon?: boolean
    //   grouped?: boolean
    //   multiline?: boolean
    //   horizontal?: boolean
    // }
    //
    // const props = withDefaults(defineProps(), {
    //     label: undefined,
    // })
    export default {
        props: {
            label: {
                default: undefined,
                type: String
            },
            addons: Boolean,
            textaddon: Boolean,
            grouped: Boolean,
            multiline: Boolean,
            horizontal: Boolean,
            component: String,
            classes: String
        },
        created() {
            // alert(this.classes);
        }
    }
</script>

<template>
    <div
            class="field"
            :class="[
      classes,
      addons && 'has-addons',
      textaddon && 'has-textarea-addon',
      grouped && 'is-grouped',
      grouped && multiline && 'is-grouped-multiline',
      horizontal && 'is-horizontal',
    ]"
    >
        <template v-if="typeof label === 'string' && horizontal">
            <div class="field-label is-normal">
                <label class="label">{{ label }}</label>
            </div>
            <div class="field-body">
                <slot></slot>
            </div>
        </template>
        <template v-else-if="typeof label === 'string'">
            <label class="label">
                {{ label }}
            </label>

            <slot></slot>
        </template>
        <template v-else>
            <slot></slot>
        </template>
    </div>
</template>
