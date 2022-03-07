<template>
    <div>
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
                            <VButton
                                    v-if="hasPDF"
                                    color="danger"
                                    icon="fas fa-file-pdf"
                                    elevated class="btn-list"
                                    :loading="loadingPdf"
                                    @click="exportTo('Pdf')">
                                {{ trans('export_to_pdf') }}
                            </VButton>
                            <VButton v-if="hasExcel"
                                     color="warning"
                                     icon="fas fa-file-excel"
                                     elevated class="btn-list"
                                     :loading="loadingExcel"
                                     @click="exportTo('Excel')">
                                {{ trans('export_to_excel') }}
                            </VButton>
                            <VButton v-if="hasCreateBtn"
                                    color="primary"
                                     icon="fas fa-plus"
                                     elevated
                                     class="btn-list"
                                     @click="addNew">
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
                    <div v-if="selected.length > 0 && hasActionGroups" class="columns">
                        <div class="column is-8">
                            <ActionGroup v-for="(actionGroup, index) in  actionGroups"
                                         v-bind="actionGroup" :resource="resource"
                                         :key="`action_group_${actionGroup.slug}_${index}`"/>
                        </div>
                        <div class="column is-4">
                            تم تحديد
                            {{ selected.length }}
                            عنصر
                        </div>
                    </div>
                    <div class="flex-table flex-table-custom" v-if="!isEmpty">
                        <!--Table header-->
                        <div class="flex-table-header">
                            <slot name="table_header" :column="column">
                                <span v-if="hasSelect  && hasActionGroups"
                                      class="flex-datatable-cell cell-start checkbox-selector">
                                    <label class="checkbox is-primary is-outlined is-circle">
                                        <input id="head-checkbox" type="checkbox" v-model="isAllSelected"
                                               @input="onSelectAllChange"/>
                                        <span></span>
                                    </label>
                                </span>
                                <span class="flex-datatable-cell" v-for="column in computedColumns">
                                {{ column.text }}
                                </span>
                                <span class="flex-datatable-cell cell-end"> {{ trans('actions') }} </span>
                            </slot>
                        </div>
                        <div class="flex-list-inner">
                            <transition-group name="list" tag="div">
                                <div v-for="(row,index) in rows" :key="`repeater_item_${index}`"
                                     class="flex-table-item">
                                    <slot name="row" :row="row">
                                        <div v-if="hasSelect  && hasActionGroups " class="flex-table-cell">
                                            <span class="flex-datatable-cell cell-start checkbox-selector">
                                                <label class="checkbox is-primary is-outlined is-circle">
                                                    <input :id="`head-checkbox-${row.id}`" v-model="selected"
                                                           name="selected[]" :value="row.id" type="checkbox">
                                                    <span></span>
                                                </label>
                                            </span>
                                        </div>
                                        <div v-for="column in computedColumns" class="flex-table-cell"
                                             :data-th="column.text">
                                            <slot :name="`column.${column.value}`" :row="row" :column="column"
                                                  :label="getRowValue(column, row)">
                                                <component v-if="column.component" :is="`${column.component}`"
                                                           :resource="resource"
                                                           :slug="column.value"
                                                           :column="column"
                                                           :row="row"/>
                                                <span v-else
                                                      :class="[ column.bold && 'has-dark-text dark-inverted is-font-alt is-weight-600 rem-90',  !column.bold && 'light-text' ]">
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


                <VPlaceholderPage
                        v-if="isEmpty"
                        :title="trans('datatable.no_results')"
                        :subtitle="trans('datatable.no_results_subtitle')"
                        larger>
                    <template #image>
                        <img class="light-image" src="/panel/images/illustrations/placeholders/search-4.svg" alt=""/>
                        <img class="dark-image" src="/panel/images/illustrations/placeholders/search-4-dark.svg"
                             alt=""/>
                    </template>
                </VPlaceholderPage>
            </div>
        </div>
        <div v-show="false">

            <Export ref="exporting" :data="exportedData" :columns="exportingColumns"/>

        </div>
    </div>
</template>

<script>
    import base from "./mixins/base";
    import ImageHolder from "./partials/ImageHolder";
    import EditableInput from "./partials/EditableInput";
    import SwitchStatus from "./partials/SwitchStatus";
    import StatusLabel from "./partials/StatusLabel";
    import Action from "./partials/Action";
    import ActionGroup from "./partials/ActionGroup";
    import CheckboxField from "../formBuilder/fields/CheckboxField";
    import Export from "./partials/Export";

    export default {
        name: "Index",
        components: {
            Export,
            CheckboxField,
            StatusLabel,
            SwitchStatus,
            EditableInput,
            ImageHolder,
            ActionGroup,
            Action
        },
        mixins: [base],
    }
</script>



<style>

    button.btn-list {
        color: white !important;
        margin: 0 5px;
    }

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

