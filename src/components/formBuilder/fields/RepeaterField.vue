<template>
    <div class="py-3">
        <div class="columns  is-multiline">
            <div class="column is-12 mt-2" v-if="rows$ && rows$.length > 0">
                <div class="flex-list-wrapper flex-list-v1">
                    <div class="flex-table">
                        <!--Table header-->
                        <div class="flex-table-header">
                            <span class="repeater-cell" v-for="column in inputs$">
                                {{ trans(column.label) }}
                            </span>
                            <span class="repeater-cell cell-end">
                                {{ trans('actions') }}
                            </span>
                        </div>

                        <div class="flex-list-inner">
                            <draggable v-model="rows$">
                                <template #item="{ element, index }">
                                    <div class="flex-table-item">
                                        <div v-for="computedInput in inputs$"
                                             class="flex-table-cell"
                                             :data-th="trans(computedInput.label)">
                                            <component :is="`${computedInput.component}-field`"
                                                       :current-row="element"
                                                       :current-index="index"
                                                       @update:modelValue="setModel(index, computedInput , $event)"
                                                       :modelValue="rows$[index] && rows$[index][computedInput.model] ? rows$[index][computedInput.model] : undefined"
                                                       v-bind="computedInput"/>

                                        </div>
                                        <div class="flex-table-cell cell-end" :data-th="trans('actions')">

                                            <VButton light raised color="danger" icon class="small icon"
                                                     @click="removeRow(element,index)">
                                                <i class="fa fa-trash"></i>
                                            </VButton>
                                        </div>
                                    </div>
                                </template>
                            </draggable>
                        </div>
                    </div>

                    <!--Table Pagination-->

                </div>

                <span class="invalid" v-if="hasError">
                    {{ trans($error?.$message) }}
                </span>
            </div>
            <div class="column is-12">
                <div class="btn-container">
                    <VButton raised color="primary" class="-repeater" @click="addRow">
                        <i class="fa fa-plus"></i>
                        {{ trans('add_new') }}
                    </VButton>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import input from "../mixins/input"
    import Draggable from 'vuedraggable'

    export default {
        name: "RepeaterField",
        props: {
            inputs: {
                default: []
            }
        },
        components: {
            Draggable
        },
        mixins: [input],
        methods: {
            addRow() {
                if (!this.rows$)
                    this.rows$ = [];

                let column = {};
                _.forEach(this.inputs$, (input) => column[input.model] = undefined);

                this.rows$.push(column);
            },
            setModel(index, input, $event) {
                _.set(this.rows$, `${index}.${input.model}`, $event)
            },
            removeRow(row, index) {
                this.rows$.splice(index, 1);
            },
        },
        computed: {
            inputs$() {
                return this.inputs;
            },
            rows$: {
                set(newVal) {
                    this.$commit(newVal ?? []);
                },


                get() {
                    return this.inputValue;
                }
            }
        }
    }
</script>

<style>
    .-repeater {
        width: 100% !important;
    }

    span.repeater-cell {
        font-family: 'Cairo', serif;
        font-weight: 700 !important;
    }

    .field-container {
        width: 100%;
    }
</style>
