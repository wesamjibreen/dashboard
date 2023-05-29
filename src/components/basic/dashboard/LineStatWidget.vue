<script setup>
const props = defineProps({
    title: "",
    stats: [],

});
</script>

<template>
    <div class="stat-widget line-stats-widget" :class="[props.straight && 'is-straight']">
        <div class="widget-head">
            <h3 class="dark-inverted">{{ props.title }}</h3>
        </div>
        <div class="line-stats">
            <div class="line-stat" v-for="stat in stats">
                <span>{{ stat.name }}</span>
                <span :class="stat.class">{{ stat.value }}</span>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<style lang="scss">
.stat-widget {
    &.line-stats-widget {
        .line-stats,
        .area-stats {
            display: flex;

            .line-stat,
            .area-stat {
                margin-inline-end: 30px;
                font-family: var(--font);

                span {
                    display: block;

                    &:first-child {
                        color: var(--light-text);
                        font-size: 0.9rem;
                    }

                    &:nth-child(2) {
                        color: var(--dark-text);
                        font-size: 1.2rem;
                        font-weight: 600;
                    }

                    &.current {
                        color: var(--primary);
                    }
                }
            }
        }
    }
}
</style>
