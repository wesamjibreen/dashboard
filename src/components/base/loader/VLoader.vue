<script>
    export default {
        props: {
            size: {
                default: undefined
            },
            card: {
                default: undefined
            },
            active: {
                default: false
            },
            translucent: {
                default: false
            },
            grey: {
                default: false
            },
        }
    }
    // export type VLoaderSize = 'small' | 'large' | 'xl'
    // export type VLoaderWrapperRadius = 'regular' | 'smooth' | 'rounded'
    // export interface VLoaderProps {
    //   size?: VLoaderSize
    //   card?: VLoaderWrapperRadius
    //   active?: boolean
    //   grey?: boolean
    //   translucent?: boolean
    // }

    // const props = withDefaults(defineProps(), {
    //     size: undefined,
    //     card: undefined,
    // })
</script>

<template>
    <div class="has-loader" :class="[active && 'has-loader-active']">
        <div
                v-if="active"
                class="v-loader-wrapper is-active"
                :class="[
        grey && 'is-grey',
        translucent && 'is-translucent',
        card === 'regular' && 's-card',
        card === 'smooth' && 'r-card',
        card === 'rounded' && 'l-card',
      ]"
        >
            <div
                    class="loader is-loading"
                    :class="[size && `is-${size}`]"
            ></div>
        </div>

        <slot></slot>
    </div>
</template>
