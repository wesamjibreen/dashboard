<template inherit-attrs="false">
    <div :class="[
      props.label && 'switch-block',
      props.thin && props.label && 'thin-switch-block',
    ]">
        <template v-if="props.thin">
            <label
                    :for="blockSwitchId"
                    class="thin-switch"
                    :class="[props.color && `is-${props.color}`]"
            >
                <input
                        :id="blockSwitchId"
                        :checked="props.modelValue"
                        class="input"
                        type="checkbox"
                        v-bind="attrs"
                        @change="emit('update:modelValue', !props.modelValue ? 1 : 0)"
                />
                <div class="slider"></div>
            </label>
        </template>
        <template v-else>
            <label :for="blockSwitchId" class="form-switch" :class="[props.color && `is-${props.color}`]">
                <input :id="blockSwitchId"
                       :checked="props.modelValue"
                       type="checkbox"
                       class="is-switch"
                       v-bind="attrs"
                       @change="emit('update:modelValue', !props.modelValue ? 1 : 0)"/>
                <i aria-hidden="true"></i>
            </label>
        </template>

        <div v-if="props.label" class="text">
            <label :for="blockSwitchId">
                <span>{{ props.label }}</span>
            </label>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            modelValue: {
                default: false
            },
            label: {
                default: undefined
            },
            color: {
                default: "success"
            },
            thin: {
                default: undefined
            },
        },
        setup(props, {emit, attrs}) {
            const blockSwitchId = `block-switch-${Math.random()}`;

            return {
                blockSwitchId,
                attrs,
                emit,
                props
            }
        }
    }
</script>
