<template>
    <div>
        <!-- <div class="card">
            <div class="form-layout is-separate mb-4 ">
                <div class="form-outer">
                    <div class="form-body p-0">
                        <div class="form-section p-0">
                            <div class="form-section-inner p-5 border-0">
                                <div class="columns is-multiline">
                                    <div class="column is-12">
                                        <VField>
                                            <VControl>
                                                <div class="radio-boxes">
                                                    <div class="radio-box radio-box-custom">
                                                        <input type="radio" name="delivery_type" />
                                                        <div class="radio-box-inner">
                                                            <div class="fee">
                                                                <span>0</span>
                                                            </div>
                                                            <p>3-4 weeks</p>
                                                        </div>
                                                    </div>
                                                    <div class="radio-box">
                                                        <input type="radio" name="delivery_type" checked />
                                                        <div class="radio-box-inner">
                                                            <div class="fee">
                                                                <span>0</span>
                                                            </div>
                                                            <p>2-5 days</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </VControl>
                                        </VField>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="card">
            <div class="card-head py-4 px-5">
                <div class="list-flex-toolbar flex-list-v1 mb-0">
                    <!-- <VField>
                        <VControl icon="feather:search">
                            <input class="input custom-text-filter search-top" v-model="filter.search"
                                :placeholder="trans('search_text')"/>
                        </VControl>
                    </VField> -->
                    <h3 class="card-title">
                        {{ pageTitle }}
                    </h3>
                    <div class="d-flex align-items-center justify-content-end">
                        <VButtons>
                            <VButton color="primary" icon="fas fa-plus" elevated @click="addNew">
                                {{ trans('add_new') }}
                            </VButton>
                        </VButtons>
                    </div>
                </div>
            </div>
            <div class="card-body p-5">
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
                                                   v-model="filter[`${filterInput.model}_${resource}`]"/>
                                    </VControl>
                                </VField>
                            </div>
                        </div>
                    </transition>
                </div>
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
                                <div v-for="(row,index) in rows" :key="`repeater_item_${index}`"
                                     class="flex-table-item">
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
                                        <div class="flex-table-cell flex-table-action cell-end"
                                             :data-th="trans('actions')">
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
                            <VFlexPagination v-if="paginator && !isLoading"
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
                        <img class="dark-image" src="/panel/images/illustrations/placeholders/search-4-dark.svg"
                             alt=""/>
                    </template>
                </VPlaceholderPage>
            </div>
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

</style>
