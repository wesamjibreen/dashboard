<template>
    <VMessage  v-for="(row, key) in data$" :key="key" :class="`message is-${row.class ?? 'primary'}`" @click="onClick(row)">{{ getValueByLocale($get(row,'value')) }}</VMessage>
</template>

<script>
import dashboard from "./dashboard";

export default {
    name: "notificationList",
    mixins: [dashboard],
    methods: {
        onClick(row) {
            if (row?.route)
                this.$router.push(row?.route)
        }
    }
}
</script>

<style scoped>

</style>
