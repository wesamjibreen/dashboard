<script>
    import {withDefaults,defineProps  } from 'vue'

    const props = withDefaults(
        defineProps(),
        {
            theme: 'default',
        }
    )
    export default {
        props: {
            theme: {
                default: "default"
            }
        },
        computed: {
            themeClasses() {
                switch (this.theme) {
                    case 'color':
                        return 'is-colored'
                    case 'labels':
                        return 'has-labels'
                    case 'labels-hover':
                        return 'has-labels-hover'
                    case 'float':
                        return !props.isOpen ? 'is-float' : 'is-float is-bordered'
                    case 'curved':
                        return !props.isOpen ? 'is-curved' : ''
                    case 'color-curved':
                        return !props.isOpen ? 'is-colored is-curved' : 'is-colored'
                    default:
                        return ''
                }
            }
        }
    }
    // export type SidebarTheme =
    //   | 'default'
    //   | 'color'
    //   | 'color-curved'
    //   | 'curved'
    //   | 'float'
    //   | 'labels'
    //   | 'labels-hover'



    // const themeClasses = computed(() => {
    //     switch (props.theme) {
    //         case 'color':
    //             return 'is-colored'
    //         case 'labels':
    //             return 'has-labels'
    //         case 'labels-hover':
    //             return 'has-labels-hover'
    //         case 'float':
    //             return !props.isOpen ? 'is-float' : 'is-float is-bordered'
    //         case 'curved':
    //             return !props.isOpen ? 'is-curved' : ''
    //         case 'color-curved':
    //             return !props.isOpen ? 'is-colored is-curved' : 'is-colored'
    //         default:
    //             return ''
    //     }
    // })
</script>

<template>
    <div class="main-sidebar" :class="[themeClasses]">
        <div class="sidebar-brand">
            <RouterLink :to="{ name: 'dashboard' }">
                <AnimatedLogo width="36px"/>
            </RouterLink>
        </div>
        <div class="sidebar-inner">
            <div class="naver"></div>

            <ul class="icon-menu has-slimscroll">
                <slot name="links"></slot>
            </ul>

            <!-- User account -->
            <ul class="bottom-menu">
                <slot name="bottom-links"></slot>
            </ul>
        </div>
    </div>
</template>

<style lang="scss">
    @import '../../../scss/layout/_sidebar.scss';
</style>
