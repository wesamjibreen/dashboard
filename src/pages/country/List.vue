<template>
    <ExpandableTable/>
    <!--    <VList v-bind="list"></VList>-->
</template>

<script>
import * as list from "./partials/list";
import ExpandableTable from "../../components/list/ExpandableTable.vue";

export default {
    name: "List",
    components: {
        ExpandableTable
    },
    data() {
        return {
            list,
            endPoint: () => {
                return {
                    name: "country.list",
                };
            },
        };
    },
    created() {
        // alert('list');
    },
};
</script>

<style scoped>
</style>
