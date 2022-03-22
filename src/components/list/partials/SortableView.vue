<template>
    <div class="flex-table flex-table-custom">
        <div class="flex-list-inner">
            <Sortable :resource="resource"
                      @updated="onSorting(resource , rows)"
                      v-bind:rows="rows">
                <template #item="{label ,element}">
                    <div v-if="selectable" class="flex-table-cell">
                        <span class="flex-datatable-cell cell-start checkbox-selector">
                            <label class="checkbox is-primary is-outlined is-circle" @click.stop>
                                <input :id="`head-checkbox-${element.id}`" v-model="selected" name="selected[]"
                                       :value="element.id" type="checkbox">
                                    <span></span>
                                </label>
                        </span>
                    </div>

                    <div v-for="column in columns" class="flex-table-cell" :data-th="column.text">
                        <slot :name="`column.${column.value}`" :row="element" :column="column"
                              :label="getRowValue(column, element)">
                            <component v-if="column.component" :is="`${column.component}`"
                                       :resource="resource"
                                       :slug="column.value"
                                       :column="column"
                                       :row="element"/>
                            <span v-else :class="[ column.bold && 'has-dark-text dark-inverted is-font-alt is-weight-600 rem-90',
                                     !column.bold && 'light-text' ]">
                                    {{ getRowValue(column, element) }}
                            </span>
                        </slot>
                    </div>

                    <div v-if="(actions ?? []).length > 0" class="flex-table-cell flex-table-action cell-end"
                         :data-th="trans('actions')">
                        <slot name="actions" :row="element" :resource="resource" :actions="actions">
                            <Action v-for="(action , index) in actions"
                                    v-bind="action"
                                    :resource="resource"
                                    :row="element"
                                    :key="`action_${action.slug}_${index}`"/>
                        </slot>
                    </div>
                </template>
            </Sortable>
        </div>
    </div>

</template>

<script>
    import {view} from "../mixins";

    export default {
        name: "SortableView",
        mixins: [view],
        methods: {
            onSorting(resource, list) {
                this.$emit('loading', true);
                this.request(
                    this.$endPoint(`${this.resource}.order`),
                    {
                        list,
                    },
                    ({data}) => {
                        this.successNotify(data.message);
                    },
                    (xhr) => {

                    },
                    () => {
                        this.$emit('loading', false);
                    }
                );
            }
        }
    }
</script>

<style scoped>

</style>