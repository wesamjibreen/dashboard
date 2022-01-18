<script>
    export default {
        props: ['title', 'subtitle', 'center', 'lighter', 'narrow', 'mResponsive', 'tResponsive', 'infratitle'],
    }
</script>

<template>
    <div :class="[
      !center && 'media-flex',
      center && 'media-flex-center',
      narrow && 'no-margin',
      mResponsive && 'is-responsive-mobile',
      tResponsive && 'is-responsive-tablet-p',
    ]">
        <slot name="icon"></slot>
        <div class="flex-meta" :class="[lighter && 'is-lighter']">
            <span>{{ title }}</span>
            <span v-if="subtitle">{{ subtitle }}</span>
            <span v-if="infratitle">{{ infratitle }}</span>
            <slot></slot>
        </div>
        <div class="flex-end">
            <slot name="action"></slot>
        </div>
    </div>
</template>
