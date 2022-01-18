<template>
    <div class="sidebar-panel is-generic">
        <div class="subpanel-header">
            <h3 class="no-mb">{{ title }}</h3>
            <div class="panel-close" @click="$emit('close')">
                <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
            </div>
        </div>
        <div class="inner" data-simplebar>
            <ul>
                <li v-for="item in items" @click="$emit('close')">
                    <RouterLink v-bind="item">
                        <i aria-hidden="true" :class="`${item.icon} pr-2`"></i>
                        {{ trans(item.label) }}
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {sidebar} from "../../mixins"
    export default {
     mixins : [sidebar]
    }
</script>

<style lang="scss">
    @import '../../scss/layout/_sidebar-panel.scss';
</style>
