<template>
    <div class="ecommerce-dashboard ecommerce-dashboard-v1">
        <div class="table-header">
            <h3 class="dark-inverted">{{ title }}</h3>
        </div>
        <VFlexTable rounded :data="rows" :columns="flexTableColumns">
            <template #body-cell="{index, row, column, value }">
                <slot :name="`column:${column.value}`" :index="index" :row="row" :column="column" :value="value">
                    <component v-if="column.component"
                               :is="`${column.component}`"
                               :resource="resource"
                               :slug="column.value"
                               :column="column"
                               :row="row"
                    />
                    <template v-else-if="column.key === 'actions'">
                        <VButton @click="clickAction(row?.btn_route ?? null)" class="is-pushed-mobile" dark-outlined>
                            {{ column?.btn_text ?? '' }}
                        </VButton>
                    </template>

                    <span v-else class="light-text">{{ value }}</span>

                    <!--                    <template v-if="column.key === 'picture'">-->
                    <!--                        <AvatarText :column="column" :row="row"/>-->
                    <!--                    </template>-->
                    <!--                    <template v-else-if="column.key === 'amount'">-->
                    <!--                        <span class="dark-inverted is-weight-600">${{ row.amount }}</span>-->
                    <!--                    </template>-->
                    <!--                    <template v-else-if="column.key === 'status'">-->
                    <!--                    <VTag v-if="row.status === 'paid'" color="green" rounded label="Paid"/>-->
                    <!--                    <VTag-->
                    <!--                        v-if="row.status === 'pending'"-->
                    <!--                        color="orange"-->
                    <!--                        rounded-->
                    <!--                        label="Pending"-->
                    <!--                    />-->
                    <!--                    </template>-->
                    <!--                    <template v-else-if="column.key === 'tracking'">-->
                    <!--                        <a v-if="row.tracking" tabindex="0" class="action-link is-pushed-mobile">-->
                    <!--                            {{ row.tracking }}-->
                    <!--                        </a>-->
                    <!--                        <span v-else class="light-text is-pushed-mobile">N/A</span>-->
                    <!--                    </template>-->

                </slot>

            </template>
        </VFlexTable>
    </div>
</template>

<script>
import AvatarText from "../../list/partials/AvatarText.vue";
import TagLabel from "../../list/partials/TagLabel.vue";
import VFlexTable from "../../base/table/VFlexTable.vue";
import {computed} from "vue";
import {getValueByLocale} from "../../../utils/helper";
import {useRouter} from "vue-router";

export default {
    name: "FlexTable",
    props: {
        title: String,
        rows: Array,
        columns: Array,
    },
    components: {AvatarText, TagLabel, VFlexTable},
    setup(props) {

        const router = useRouter();

        const flexTableColumns = computed(() => {
            let columns = {};
            (props.columns).forEach((column) => {
                columns[column.value] = {
                    label: getValueByLocale(column.text),
                    ...column
                }
            });
            return columns;
        });

        const clickAction = (route) => {
            if (route)
                router.push(route);
        }
        return {
            flexTableColumns,
            clickAction
        }
    }
}
</script>

<style scoped>

</style>
