<template>
    <div :class="['card', isSortable && 'card-draggable']">
        <div class="card-head py-4 px-5" v-if="hasToolbar">
            <div class="list-flex-toolbar flex-list-v1 mb-0 flex-wrap">
                <h3 class="card-title mb-2">
                    {{ pageTitle }}
                </h3>
                <div class="d-flex align-items-center justify-content-end">
                    <VButtons>
                        <VButton
                            v-if="hasPDF"
                            color="danger"
                            icon="fas fa-file-pdf"
                            elevated
                            class="btn-list mb-2"
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
                            class="btn-list mb-2"
                            :loading="loadingExcel"
                            @click="exportTo('Excel')"
                        >
                            {{ trans("export_to_excel") }}
                        </VButton>
                        <VButton
                            v-if="hasImportBtn"
                            color="info"
                            icon="fas fa-file-excel"
                            elevated
                            class="btn-list mb-2"
                            @click="openImportDialog"
                        >
                            {{ trans("import_excel") }}
                        </VButton>
                        <VButton
                            v-if="hasCreateBtn && hasPermission(`${resource}.create`)"
                            color="primary"
                            icon="fas fa-plus"
                            elevated
                            class="btn-list mb-2"
                            @click="addNew"
                        >
                            {{ trans(listAddKey) }}
                        </VButton>
                    </VButtons>
                </div>
            </div>
        </div>
        <div class="card-body p-5">
            <div class="columns is-multiline columns-mobile-6">
                <div
                    v-for="(actionButton, index) in actionButtons"
                    :key="index"
                    class="column is-3 mt-1"
                    @click="$router.push(actionButton.route)"
                    style="cursor: pointer"
                >
                    <div class="card card-country">
                        <div class="card-body">
                            <div class="icon">
                                <div v-if="actionButton.icon">
                                    <!-- <VIcon :icon="actionButton.icon" /> -->
                                    <img :src="actionButton.icon" alt="">
                                </div>
                                <div v-else>
                                    <i aria-hidden="true" class="is-dark-primary lnil lnil-diamond-alt"></i>
                                </div>

                            </div>
                            <h3>
                                {{ trans(actionButton.label) }}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-flex-toolbar flex-list-v1 mb-3">
                <div class="d-flex align-items-center justify-content-end multiselect-tags">

                </div>
            </div>

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
                    :selectableCallback="selectableCallback"
                    @select="onSelect"
                    @loading="loading = $event"
                />
                <div class="columns is-multiline">
                    <div class="column is-2">
                        <div class="block mt-3">
                            <div
                                class="select"
                                v-if="!!paginator && paginator.total > pageCounts[0]"
                            >
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
                            <VFlexPagination/>
                            <VFlexPagination
                                v-if="paginator && !isLoading"
                                @handle-pagination="fetch"
                                :paginator="paginator"
                                :resource="resource"
                            />
                        </slot>
                    </div>
                </div>
                <div class="columns is-multiline">
                    <slot name="table-footer" :selected="selected"></slot>
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
            <Export
                ref="exporting"
                :data="exportedData"
                :columns="exportingColumns('pdf')"
                :listRef="listRef"
            />
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
    import {permissions} from "../../mixins";

    import ImportDialog from "./partials/ImportDialog.vue";

    export default {
        components: {
            ImportDialog,
        },
        name: "Index",
        mixins: [base, permissions],
        mounted() {
        },
        data() {
            return {
                pageCounts: [15, 50, 100, 200],
                perPage: 15,
            };
        },
        computed: {
            listAddKey() {
                return _.get(this, "$config.app.ui_config.list_add_key", "add_new");
            },
        },
        methods: {
            onChangePerPage() {
                this.fetch();
            },
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
    @media(max-width: 769px) {
        .columns-mobile-6 {
            display: flex;

            > .column {
                width: 50%;
                flex-basis: auto;
            }
        }
    }

    .card.card-country {
        text-align: center;

        .icon {
            margin-bottom: 20px;
            color: #000;

            img {
                height: 20px;
            }
        }

        .card-body {
            padding: 20px 10px;
            color: #000;
        }
    }

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
