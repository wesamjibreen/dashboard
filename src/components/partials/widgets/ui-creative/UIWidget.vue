<script>
    export default {
        props: {
            straight : {
                default :Boolean
            }
        }
    }
</script>

<template>
    <div class="widget" :class="[straight && 'is-straight']">
        <slot name="header"></slot>
        <slot name="body"></slot>
    </div>
</template>
