<script>
    // export interface VPlaceholderPageProps {
    //   title: string
    //   subtitle?: string
    //   larger?: boolean
    // }
    export default {
        props: {
            title: String,
            subtitle: String,
            larger: Boolean,
        },
        setup(props) {
            console.log('VPlaceholderPageProps', props);
            return {
                props
            }
        }
    }
    // alert('withDefaults')
    // const props = withDefaults(defineProps(), {
    //     title: "",
    //     subtitle: undefined,
    //     larger: false
    // })
</script>

<template>
    <div class="page-placeholder">
        <div class="placeholder-content">
            <slot name="image"></slot>
            <h3 class="dark-inverted">{{ props.title }}</h3>
            <p v-if="props.subtitle" :class="[props.larger && 'is-larger']">
                {{ props.subtitle }}
            </p>
            <slot name="action"></slot>
        </div>
    </div>
</template>
