<template>
    <div :class="['card', isSortable && 'card-draggable']">
        <div class="card-head py-4 px-5">
            <div class="list-flex-toolbar flex-list-v1 mb-0">
                <h3 class="card-title">
                    {{ pageTitle }}
                </h3>
                <div class="d-flex align-items-center justify-content-end">
                    <VButtons>
                        <VButton
                            v-if="hasPDF"
                            color="danger"
                            icon="fas fa-file-pdf"
                            elevated
                            class="btn-list"
                            :loading="loadingPdf"
                            @click="exportTo('Pdf')"
                        >
                            {{ trans("export_to_pdf") }}
                        </VButton>
                        <VButton
                            v-if="hasExcel"
                            color="warning"
                            icon="fas fa-file-excel"
                            elevated
                            class="btn-list"
                            :loading="loadingExcel"
                            @click="exportTo('Excel')"
                        >
                            {{ trans("export_to_excel") }}
                        </VButton>
                        <VButton
                            v-if="hasCreateBtn"
                            color="primary"
                            icon="fas fa-plus"
                            elevated
                            class="btn-list"
                            @click="addNew"
                        >
                            {{ trans("add_new") }}
                        </VButton>
                        <VButton
                            v-if="hasImportBtn"
                            color="info"
                            icon="fas fa-file-excel"
                            elevated
                            class="btn-list"
                            @click="openImportDialog"
                        >
                            {{ trans("import_excel") }}
                        </VButton>
                    </VButtons>
                </div>
            </div>
        </div>
        <div class="card-body p-5">
            <div class="filters-form">
                <transition name="fade">
                    <div class="columns is-multiline">
                        <div
                            v-for="filterInput in filters"
                            :class="`column is-${filterInput.cols ?? 3}`"
                        >
                            <VField>
                                <label>
                                    {{ trans("filter_by") }}
                                    {{ trans(filterInput.label ?? filterInput.model) }}
                                </label>
                                <VControl icon="feather:search" class="mt-1">
                                    <component
                                        :is="`${filterInput.component}-field`"
                                        v-bind="filterInput"
                                        v-model="filter[`${filterInput.model}_${resource}`]"
                                    />
                                </VControl>
                            </VField>
                        </div>
                    </div>
                </transition>
            </div>
            <div v-if="selected.length > 0 && hasActionGroups" class="columns">
                <div class="column is-8">
                    <ActionGroup
                        v-for="(actionGroup, index) in actionGroups"
                        v-bind="actionGroup"
                        :resource="resource"
                        :key="`action_group_${actionGroup.slug}_${index}`"
                    />
                </div>
                <div class="column is-4">
                    تم تحديد
                    {{ selected.length }}
                    عنصر
                </div>
            </div>
            <VLoader size="small" :active="loading">
                <component
                    :is="viewComponent"
                    :selectable="hasSelect"
                    :rows="rows"
                    :resource="resource"
                    :actions="actions"
                    :actionGroups="actionGroups"
                    :columns="computedColumns"
                    @select="onSelect"
                    @loading="loading = $event"
                    @on-per-page-count-change="onPerPageCountChange"
                />
                <div class="columns is-multiline">
                    <div class="column is-2">
                        <div class="block mt-2">
                            <div class="select">
                                <select v-model="perPage" @change="onChangePerPage()">
                                    <option
                                        v-for="(pageCount, index) in pageCounts"
                                        :key="index"
                                        :value="pageCount"

                                    >
                                        {{ pageCount }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="column is-10">
                        <slot
                            name="pagination"
                            :paginator="paginator"
                            :resource="resource"
                            :fetch="fetch"
                        >

                            <VFlexPagination
                                v-if="paginator && !isLoading"
                                @handle-pagination="fetch"
                                :paginator="paginator"
                                :resource="resource"
                            />
                        </slot>
                    </div>
                </div>
            </VLoader>
            <VPlaceholderPage
                v-if="isEmpty"
                :title="trans('datatable.no_results')"
                :subtitle="trans('datatable.no_results_subtitle')"
                larger
            >
                <template #image>
                    <img
                        class="light-image"
                        src="/panel/images/illustrations/placeholders/search-4.svg"
                        alt=""
                    />
                    <img
                        class="dark-image"
                        src="/panel/images/illustrations/placeholders/search-4-dark.svg"
                        alt=""
                    />
                </template>
            </VPlaceholderPage>
        </div>
        <div v-show="false">
            <Export ref="exporting" :data="exportedData" :listRef="listRef"/>
        </div>

        <!-- import modal -->
        <ImportDialog
            ref="importDialog"
            :resource="resource"
            @on-sample-button-click="downloadImportSample"
        />
    </div>
</template>

<script>
    import base from "./mixins/base";

    import ImportDialog from "./partials/ImportDialog.vue";

    export default {
        components: {
            ImportDialog,
        },
        name: "Index",
        mixins: [base],
        mounted() {
        },
        data() {
            return {
                pageCounts: [15, 50, 100, 200],
                perPage: 15,
            };
        },
        computed: {},
        methods: {
            onChangePerPage() {
                this.fetch()
            }
        },
        watch: {
            // perPage(newVal) {
            //     //   update pagination
            //     // this.fetch()
            //
            //     // this.$emit("on-per-page-count-change", newVal);
            // },
        },
    };
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
        font-family: "Cairo";
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

<style lang="scss">
    .card {
        &.card-draggable {
            background-color: transparent;
            box-shadow: none;

            .flex-table.flex-table-custom {
                background-color: transparent;
            }

            .flex-table.flex-table-custom .flex-list-inner .flex-table-item {
                margin-bottom: 16px;
                border-radius: 10px;
                border: 1px solid var(--fade-grey-dark-3);
                cursor: move;
            }
        }
    }
</style>
