<template>
    <div>
        <div class="flex-list-wrapper flex-list-v1">
            <div class="list-flex-toolbar flex-list-v1">
                <VField>
                    <VControl icon="feather:search">
                        <input class="input custom-text-filter search-top" v-model="filter.search"
                               :placeholder="trans('search_text')"/>
                    </VControl>
                </VField>

                <VButtons>
                    <VButton color="primary" icon="fas fa-plus" elevated @click="addNew">
                        {{ trans('add_new') }}
                    </VButton>
                </VButtons>
            </div>
            <div class="filters-form">
                <transition name="fade">
                    <div class=" columns is-multiline">
                        <div v-for="filterInput in filters" :class="`column is-${filterInput.cols ??3}`">
                            <VField>
                                <label>
                                    {{ trans('filter_by')}}
                                    {{trans(filterInput.label??filterInput.model)}}
                                </label>
                                <VControl icon="feather:search" class="mt-1">

                                    <component :is="`${filterInput.component}-field`"
                                            v-bind="filterInput"
                                            v-model="filter[filterInput.model]"/>
                                </VControl>
                            </VField>
                        </div>
                    </div>
                </transition>
            </div>
            <!--<div class="list-flex-toolbar">-->
            <!---->


            <!--</div>-->
            <VLoader size="small" :active="loading">
                <div class="flex-table flex-table-custom" v-if="!isEmpty">
                    <!--Table header-->
                    <div class="flex-table-header">
                        <slot name="table_header" :column="column">
                        <span class="flex-datatable-cell" v-for="column in computedColumns">
                            {{ column.text }}
                        </span>
                            <span class="flex-datatable-cell cell-end">{{ trans('actions') }}</span>
                        </slot>
                    </div>
                    <div class="flex-list-inner">
                        <transition-group name="list" tag="div">
                            <div v-for="(row,index) in rows" :key="`repeater_item_${index}`" class="flex-table-item">
                                <slot name="row" :row="row">
                                    <div v-for="column in computedColumns" class="flex-table-cell"
                                         :data-th="column.text">
                                        <slot :name="`column.${column.value}`" :row="row" :column="column"
                                              :label="getRowValue(column, row)">
                                            <component v-if="column.component" :is="`${column.component}`"
                                                       :column="column"
                                                       :row="row"/>
                                            <span v-else :class="[ column.bold && 'has-dark-text dark-inverted is-font-alt is-weight-600 rem-90',
                                      !column.bold && 'light-text' ]">
                                        {{ getRowValue(column, row) }}
                                    </span>
                                        </slot>
                                    </div>
                                    <div class="flex-table-cell cell-end" :data-th="trans('actions')">
                                        <slot name="actions" :row="row" :resource="resource" :actions="actions">
                                            <Action v-for="(action , index) in actions" v-bind="action"
                                                    :resource="resource"
                                                    :row="row" :key="`action_${action.slug}_${index}`"/>
                                        </slot>
                                    </div>
                                </slot>

                            </div>
                        </transition-group>
                    </div>

                    <slot name="pagination" :paginator="paginator" :resource="resource" :fetch="fetch">
                        <VFlexPagination v-if="paginator"
                                         @handle-pagination="fetch"
                                         :paginator="paginator"
                                         :resource="resource"/>
                    </slot>
                </div>
            </VLoader>


            <VPlaceholderPage v-if="isEmpty"
                              :title="trans('datatable.no_results')"
                              :subtitle="trans('datatable.no_results_subtitle')" larger>
                <template #image>
                    <img class="light-image" src="/panel/images/illustrations/placeholders/search-4.svg" alt=""/>
                    <img class="dark-image" src="/panel/images/illustrations/placeholders/search-4-dark.svg" alt=""/>
                </template>
            </VPlaceholderPage>

            <!--Table Pagination-->

        </div>
    </div>
</template>

<script>
    import base from "./mixins/base";
    import ImageHolder from "./partials/ImageHolder";
    import Action from "./partials/Action";

    export default {
        name: "Index",
        components: {
            ImageHolder,
            Action
        },
        mixins: [base],
    }
</script>

<style>
    .list-flex-toolbar.flex-list-v1 {
        justify-content: space-between;
    }

    label.filter-label {
        font-family: 'Cairo';
        font-size: 12px;
        color: #9b9a9a;
        font-weight: 700;
    }

    .has-loader.has-loader-active {
        overflow: hidden;
        min-height: 70vh;
    }

    .v-loader-wrapper.is-active {
        background: #ffffff00 !important;
    }

    .filters-form {
        background: #FFF;
        padding: 20px 25px;
        margin-bottom: 25px;
        border: 1px solid #EEE;
        border-radius: 0px;
        margin-top: 30px;
    }
    @media screen and (max-width: 1000px) and (min-width:769px){
       .filters-form .column.is-3{
            flex: none;
            width: 33.33333337%;
        }
    }
    @media(min-width:1000px){
        .search-top{
            width:275px
        }
    }
</style>
