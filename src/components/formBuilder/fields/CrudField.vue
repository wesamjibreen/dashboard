<template>
    <div class="crud-container">
        <GDialog v-model="dialog" fullscreen>
            <FormLayout v-if="dialog"
                        :inputs="inputs"
                        :values="item"
                        @form-success="onSuccess"
                        @cancel="onCancel"
                        @mounted="onBuilderMounted"
                        :config="crudConfig"/>
        </GDialog>

        <div class="columns  is-multiline">
            <div class="column is-12" v-if="hasRows">
                <div class="flex-list-wrapper flex-list-v1">
                    <!--List Empty Search Placeholder -->
                    <div class="flex-table">
                        <!--Table header-->
                        <div class="flex-table-header">
                            <span class="crud-head-label" v-for="column in computedColumns">
                                {{ trans(column.label) }}
                            </span>
                            <span class="crud-head-label cell-end">{{ trans('actions') }}</span>
                        </div>
                        <div class="flex-list-inner">
                            <transition-group name="list" tag="div">
                                <!--<Sortable>-->
                                <draggable class="flex-list-inner-inner" v-model="rows$" itemKey="id">
                                    <template  #item="{ element, index }">
                                        <div class="flex-table-item">
                                            <div v-for="column in computedColumns"
                                                 class="flex-table-cell"
                                                 :data-th="trans(column.label)">
                                                <component v-if="column.component"
                                                           :is="column.component"
                                                           :classes="column.classes"
                                                           :column="column"
                                                           :row="element"/>
                                                <!--v-bind="getRowValue(element, column,{})"-->
                                                <span v-else class="light-text"
                                                      v-html="getRowValue(element, column)"></span>
                                            </div>
                                            <div class="flex-table-cell cell-end" :data-th="trans('actions')">
                                                <VButton light raised color="primary" class="small ml-2"
                                                         @click="editRow(element,index)">
                                                    <i class="fa fa-edit"></i>
                                                </VButton>
                                                <VButton light raised color="danger" class="small"
                                                         @click="removeRow(element,index)">
                                                    <i class="fa fa-trash"></i>
                                                </VButton>
                                            </div>
                                        </div>
                                    </template>
                                </draggable>
                                <!--</Sortable>-->
                            </transition-group>
                        </div>
                    </div>

                    <span class="invalid" v-if="hasError">
                        {{ trans($error?.$message) }}
                    </span>
                    <!--Table Pagination-->
                </div>
            </div>
            <div class="column is-12">
                <div class="btn-container">
                    <VButton raised color="primary" @click="addNew">
                        <i class="fa fa-plus"></i>
                        {{ trans('add_new') }}
                    </VButton>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {GDialog} from 'gitart-vue-dialog'
    import input from "../mixins/input";
    import {getValueByLocale} from "../../../utils/helper";
    import Sortable from "../../basic/Sortable";
    import Draggable from 'vuedraggable'

    export default {
        name: "CrudField",
        mixins: [input],
        components: {
            Sortable,
            GDialog,
            Draggable,
        },
        props: {
            slug: {
                default: "dialog"
            },
            data: {
                default: []
            },
            config: {
                default: null
            },
            columns: {
                default: null
            },
            inputs: {
                default: []
            }
        },
        data() {
            return {
                items: [],
                dialog: false,
                item: null
            }
        },
        methods: {
            onFetch(data) {
                // this.items = data[this.model$] ?? [];
            },
            addNew() {
                this.item = null;
                this.dialog = true;
            },
            editRow(row, index) {
                this.dialog = true;
                this.setCrudForm(row);
            },
            removeRow(item, index) {
                this.$bus.emit('confirmation-dialog',
                    true,
                    {
                        title: "sure_to_delete",
                        message: "",
                        type: "warning",
                        callback: () => {
                            this.loading = true;
                            this.request(
                                this.deleteEndPoint(item),
                                {},
                                ({data}) => {
                                    let rows = _.filter(
                                        JSON.parse(JSON.stringify(this.rows$)),
                                        function (row) {
                                            return row.id != item.id;
                                        }
                                    );
                                    this.setRows(rows);
                                    this.$bus.emit('confirmation-dialog', false);
                                    this.successNotify(data.message);
                                },
                                () => {

                                },
                                () => {

                                }
                            )
                        }
                    },
                );
            },

            deleteEndPoint(item) {
                return this.$endPoint(`${this.slug}.delete`, item.id);
            },

            getRowValue(row, column) {
                if (column.value instanceof Function)
                    return column.value(row);

                return getValueByLocale(_.get(row, column.value, column.default ?? ""));
            },

            onBuilderMounted(context) {
                // this.values = Object.assign({}, this.item);
                // console.log('onBuilderMounted', context, this.$refs.form);
                // alert('onBuilderMounted');
            },
            onSuccess({data}) {
                console.log('roooooooows',this.rows$);
                if (!this.rows$)
                    this.rows$ = [];

                let index = _.findIndex(this.rows$, function (item) {
                    return item.id === data.id;
                });

                if (index >= 0) this.rows$[index] = data;
                // _.set(this.items, index, data);
                else this.rows$.push(data);

                this.dialog = false;
                this.loading = false;
            },
            onCancel() {
                // this.values = {};
                this.dialog = false;
                this.item = null;
            },
            setRows(items) {
                _.set(this, "rows$", items);
            },
            setCrudForm(form) {
                _.set(this, 'item', form);
            },
            onInputMounted() {
                // this.items = JSON.parse(JSON.stringify(this.inputValue));
            }
        },
        computed: {
            computedColumns() {
                return this.columns;
                // return _.map(JSON.parse(JSON.stringify(this.columns)), (column) => {
                //     column.text = this.trans(column.label);
                //     return column;
                // });
            },

            rows$: {
                set(newVal) {
                    this.$commit(newVal ?? []);
                },


                get() {
                    return this.inputValue;
                }
            },
            computedRows() {
                return this.rows$ ?? [];
            },
            hasRows() {
                return this.computedRows.length > 0;
            },
            crudConfig() {
                return {
                    isCrud: true,
                    resource: this.slug
                }
            },
        },
        watch: {
            // items: {
            //     deep: true,
            //     // immediate: true,
            //     handler(newVal) {
            //         this.$commit(newVal ?? []);
            //     }
            // }
        }
    }
</script>

<style>
    @import '../../../scss/abstracts/_mixins.scss';
    @import '../../../scss/pages/generic/_forms-stepper.scss';



    .crud-container {
        padding: 20px 0;
    }


    img.onboarding-screen {
        border-radius: 10px !important;
        width: 200px !important;
    }

    /*.crud-container {*/
    /*background-color: #f0f0f054;*/
    /*padding: 20px 25px;*/
    /*border-radius: 10px;*/
    /*}*/
</style>
