<template>
    <div class="mobile-subsidebar">
        <div class="inner">
            <div class="sidebar-title">
                <h3>{{ title }}</h3>
            </div>
            <ul class="submenu" data-simplebar>
                <li v-for="item in items" @click="$emit('close')">
                    <RouterLink v-bind="item" class="is-submenu">
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
    @import '../../scss/layout/_sidebar-mobile.scss';
</style>
