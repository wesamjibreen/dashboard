<template>
    <VList v-bind="list"></VList>
</template>


<script>
    import * as list from "./partials/list";

    export default {
        name: "List",
        data() {
            return {
                list,
            }
        }
    }
</script>

<style scoped>

</style>