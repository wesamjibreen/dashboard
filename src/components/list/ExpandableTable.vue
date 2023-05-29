<template>
    <!--
      We use v-model to let VFlexTableWrapper update queryParam
    -->
    <VFlexTableWrapper
        v-model:page="queryParam.page"
        v-model:limit="queryParam.limit"
        @update:limit="fetch(1, {perPage : $event , search : queryParam.searchTerm})"
        v-model:searchTerm="queryParam.searchTerm"
        @update:searchTerm="fetch(1, {perPage : queryParam.limit , search : $event})"
        v-model:sort="queryParam.sort"
        :columns="flexTableColumns"
        :data="rows"
        :total="paginator?.total"
        class="mt-4">
        <!--
          Here we retrieve the internal wrapperState.
          Note that we can not destructure it
        -->
        <template #default="wrapperState">
            <!--Table Pagination-->
            <VFlexPagination
                v-model:current-page="wrapperState.page"
                @update:current-page="fetch($event, queryParam)"
                :item-per-page="wrapperState.limit"
                :total-items="wrapperState.total"
                :max-links-displayed="2"
                no-router
            >
                <!-- The controls can be updated anywhere in the slot -->
                <template #before-pagination>
                    <VFlex class="mr-4">
                        <VField>
                            <VControl>
                                <div class="select is-rounded">
                                    <select v-model="wrapperState.limit">
                                        <option :value="1">1 results per page</option>
                                        <option :value="10">10 results per page</option>
                                        <option :value="15">15 results per page</option>
                                        <option :value="25">25 results per page</option>
                                        <option :value="50">50 results per page</option>
                                    </select>
                                </div>
                            </VControl>
                        </VField>
                    </VFlex>

                </template>

                <template #before-navigation>
                    <VFlex class="mr-4">
                        <VField>
                            <VControl icon="feather:search">
                                <input
                                    v-model="wrapperState.searchInput"
                                    type="text"
                                    class="input is-rounded"
                                    placeholder="Filter..."
                                />
                            </VControl>
                        </VField>
                    </VFlex>

                </template>
            </VFlexPagination>

            <VFlexTable rounded clickable @row-click="onRowClick">
                <template #body>
                    <!--
                      The wrapperState.loading will be update
                      when the fetchData function is running
                    -->
                    <div v-if="loading" class="flex-list-inner">
                        <div v-for="key in wrapperState.limit" :key="key" class="flex-table-item">
                            <VFlexTableCell :column="{ grow: true, media: true }">
                                <div class="avatar-text">
                                    <VPlaceloadAvatar size="medium"/>
                                    <VPlaceloadText
                                        :lines="2"
                                        width="60%"
                                        last-line-width="20%"
                                        class="mx-2"
                                    />
                                </div>
                            </VFlexTableCell>
                            <VFlexTableCell>
                                <VPlaceload width="60%" class="mx-1"/>
                            </VFlexTableCell>
                            <VFlexTableCell>
                                <VPlaceload width="60%" class="mx-1"/>
                            </VFlexTableCell>
                            <VFlexTableCell :column="{ align: 'end' }">
                                <VPlaceload width="45%" class="mx-1"/>
                            </VFlexTableCell>
                        </div>
                    </div>

                    <!-- This is the empty state -->
                    <div v-else-if="rows.length === 0" class="flex-list-inner">
                        <VPlaceholderSection
                            title="No matches"
                            subtitle="There is no data that match your query."
                            class="my-6">
                            <template #image>
                                <img
                                    class="light-image"
                                    src="/panel/assets/illustrations/placeholders/search-4.svg"
                                    alt=""
                                />
                                <img
                                    class="dark-image"
                                    src="/panel/assets/illustrations/placeholders/search-4-dark.svg"
                                    alt=""
                                />
                            </template>
                        </VPlaceholderSection>
                    </div>
                </template>

                <!-- We can inject content before any rows -->
                <template #body-row-pre="{ row }">
                    <!--                    <template v-if="row.id === incomingCallerId">-->
                    <!--                        <VProgress size="tiny" class="m-0 mb-1"/>-->
                    <!--                    </template>-->
                </template>

                <!-- This is the body cell slot -->
                <template #body-cell="{ index,row, column ,value}">
                    <slot :name="`column:${column.value}`"
                          :index="index"
                          :row="row"
                          :column="column"
                          :value="value"
                          :openedRowId="openedRowId">
                        <component v-if="column.component"
                                   :is="`${column.component}`"
                                   :resource="resource"
                                   :slug="column.value"
                                   :column="column"
                                   :row="row"
                        />
                        <span v-else class="light-text">{{ value }}</span>
                    </slot>

                    <template v-if="column.key === 'actions'">
                        <VAction>
                            {{ row?.id === openedRowId ? 'Hide details' : 'View details' }}
                        </VAction>
                    </template>
                </template>

                <!-- We can also inject content after rows -->
                <template #body-row-post="{ row }">
                    <template v-if="row?.id === openedRowId">
                        <div class="expanded-row is-block p-4 my-2 is-rounded">
                            <slot name="expanded-row" :row="row"></slot>
                        </div>
                    </template>
                </template>
            </VFlexTable>

            <!--Table Pagination-->
            <VFlexPagination
                v-model:current-page="wrapperState.page"
                @update:current-page="fetch($event, {perPage : queryParam.limit , search :  queryParam.searchTerm})"
                class="mt-5"
                :item-per-page="wrapperState.limit"
                :total-items="wrapperState.total"
                :max-links-displayed="2"
                no-router
            />
        </template>
    </VFlexTableWrapper>
</template>

<script>
// import type {VFlexTableWrapperDataResolver} from '../../components/base/table/VFlexTableWrapper.vue'
import {useApi} from '../../composable/useApi'
import {ref, reactive, computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import VFlexTableWrapper from "../base/table/VFlexTableWrapper.vue";
import VFlexPagination from "../base/pagination/VFlexPaginationTheme.vue";
import VFlexTable from "../base/table/VFlexTable.vue";
import VFlexTableCell from "../base/table/VFlexTableCell.vue";
// import VTags from "../base/tags/VTags.vue";
// import VTag from "../base/tags/VTag.vue";
import VFlex from "../base/flex/VFlex.vue";
import VFlexItem from "../base/flex/VFlexItem.vue";
import VCard from "../base/card/VCard.vue";
import VButton from "../base/button/VButton.vue";
import VField from "../base/form/VField.vue";
import VControl from "../base/form/VControl.vue";
import VAction from "../base/button/VAction.vue";
import VPlaceloadAvatar from "../base/loader/VPlaceloadAvatar.vue";
import VPlaceloadText from "../base/loader/VPlaceloadText.vue";
import VPlaceload from "../base/loader/VPlaceload.vue";
import VPlaceholderSection from "../base/placeholder/VPlaceholderSection.vue";
import VProgress from "../base/progress/VProgress.vue";
import {getValueByLocale} from "../../utils/helper";
import AvatarText from "./partials/AvatarText.vue";
import TagLabel from "./partials/TagLabel.vue";
import base from "./mixins/base";
import {permissions} from "../../mixins";
// import VAction from "../base/button/VAction.vue";

// the total data will be set by the fetchData function

// we don't have to set "searchable" parameter
// this will be handled by the fetchData function
// const columns = {
//     name: {
//         label: 'Username',
//         media: true,
//         grow: true,
//         sortable: true,
//     },
//     location: {
//         label: 'Location',
//         sortable: true,
//     },
//     position: {
//         label: 'Positions',
//         sortable: true,
//     },
//     actions: {
//         label: '',
//         align: 'end',
//     },
// };


export default {
    components: {
        VAction,
        VFlex,
        VButton,
        AvatarText,
        VField,
        VControl,
        TagLabel,
        VFlexTableWrapper,
        VFlexPagination,
        VFlexTable,
        VFlexTableCell,
        VFlexItem,
        VPlaceloadAvatar,
        VPlaceloadText,
        VPlaceload,
        VProgress,
        VPlaceholderSection,
    },
    mixins: [base],

    // props: {
    //     columns: {
    //         type: Array,
    //         default: []
    //     },
    //
    // },
    setup(props) {
        const router = useRouter()
        const route = useRoute()
        const total = ref(0)
        const api = useApi()

        // this is an example of useXxx function that we can reuse across components.
// it will return writable computeds that works like ref values
// but the values will be sync with the route query params
        const useQueryParam = function () {

            // when the params match those value,
            // we don't set their value to the query params
            const defaultSearch = ''
            const defaultSort = ''
            const defaultLimit = 10
            const defaultPage = 1

            const searchTerm = computed({
                get: () => {
                    let searchTermQuery

                    // read "search" from the query params
                    if (Array.isArray(route?.query?.search)) {
                        searchTermQuery = route.query.search?.[0] ?? defaultSearch
                    } else {
                        searchTermQuery = route.query.search ?? defaultSearch
                    }

                    return searchTermQuery
                },
                set(value) {
                    // update the route query params with our new "search" value.
                    // we can use router.replace instead of router.push
                    // to not write state to the browser history
                    router.push({
                        query: {
                            search: value === defaultSearch ? undefined : value,
                            sort: sort.value === defaultSort ? undefined : sort.value,
                            limit: limit.value === defaultLimit ? undefined : limit.value,
                            page: page.value === defaultPage ? undefined : page.value,
                        },
                    })
                },
            })

            const sort = computed({
                get: () => {
                    let sortQuery

                    // read "sort" from the query params
                    if (Array.isArray(route?.query?.sort)) {
                        sortQuery = route.query.sort?.[0] ?? defaultSort
                    } else {
                        sortQuery = route.query.sort ?? defaultSort
                    }

                    return sortQuery
                },
                set(value) {
                    // update the route query params with our new "sort" value.
                    // we can use router.replace instead of router.push
                    // to not write state to the browser history
                    router.push({
                        query: {
                            search: searchTerm.value === defaultSearch ? undefined : searchTerm.value,
                            sort: value === defaultSort ? undefined : value,
                            limit: limit.value === defaultLimit ? undefined : limit.value,
                            page: page.value === defaultPage ? undefined : page.value,
                        },
                    })
                },
            })

            const limit = computed({
                get: () => {
                    let limitQuery

                    // read "limit" from the query params
                    if (Array.isArray(route?.query?.limit)) {
                        limitQuery = parseInt(route.query.limit[0] ?? `${defaultLimit}`)
                    } else {
                        limitQuery = parseInt(route.query.limit ?? `${defaultLimit}`)
                    }

                    if (Object.is(limitQuery, NaN)) {
                        limitQuery = defaultLimit
                    }

                    return limitQuery
                },
                set(value) {
                    // update the route query params with our new "limit" value.
                    // we can use router.replace instead of router.push
                    // to not write state to the browser history
                    router.push({
                        query: {
                            search: searchTerm.value === defaultSearch ? undefined : searchTerm.value,
                            sort: sort.value === defaultSort ? undefined : sort.value,
                            limit: value === defaultLimit ? undefined : value,
                            page: page.value === defaultPage ? undefined : page.value,
                        },
                    })
                },
            })

            const page = computed({
                get: () => {
                    let pageQuery;

                    if (Array.isArray(route?.query?.page)) {
                        pageQuery = parseInt(route.query.page[0] ?? `${defaultPage}`)
                    } else {
                        pageQuery = parseInt(route.query.page ?? `${defaultPage}`)
                    }

                    // read "page" from the query params
                    if (Object.is(pageQuery, NaN)) {
                        pageQuery = defaultPage
                    }

                    return pageQuery
                },
                set(value) {
                    // update the route query params with our new "page" value.
                    // we can use router.replace instead of router.push
                    // to not write state to the browser history
                    router.push({
                        query: {
                            search: searchTerm.value === defaultSearch ? undefined : searchTerm.value,
                            sort: sort.value === defaultSort ? undefined : sort.value,
                            limit: limit.value === defaultLimit ? undefined : limit.value,
                            page: value === defaultPage ? undefined : value,
                        },
                    })
                },
            })

            return reactive({
                searchTerm,
                sort,
                limit,
                page,
            })
        }

        const queryParam = useQueryParam()

// the fetchData function will be called each time one of the parameter changes


// those data are for the interaction example


        const openedRowId = ref()

        const onRowClick = function (row) {
            if (openedRowId.value === row.id) {
                openedRowId.value = undefined
            } else {
                openedRowId.value = row.id
            }
        }

        const fetchData = async ({
                                     searchTerm,
                                     start,
                                     limit,
                                     sort,
                                     controller,
                                 }) => {
            // searchTerm will contains the value of the wrapperState.searchInput
            // the update will be debounced to avoid to much requests
            const searchQuery = searchTerm ? `&q=${searchTerm}` : ''
            let sortQuery = ''

            // sort will be a string like "name:asc"
            if (sort && sort.includes(':')) {
                let [sortField, sortOrder] = sort.split(':')
                sortQuery = `&_sort=${sortField}&_order=${sortOrder}`
            }

            // async fetch data to our server
            const {data: users, headers} = await api.get(
                `/api/users?_start=${start}&_limit=${limit}${searchQuery}${sortQuery}`,
                {
                    // controller is an instance of AbortController,
                    // this allow to abort the request when the state
                    // is invalidated (before fetchData will be retriggered)
                    signal: controller.signal,
                }
            )

            // wait more time
            // await sleep(1000)

            // our backend send us the count in the headers,
            // but we can also get it from another request
            if ('x-total-count' in headers) {
                total.value = parseInt(headers['x-total-count'])
            }

            // the return of the function must be an array
            return users
        }

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


        return {
            fetchData,
            onRowClick,
            openedRowId,
            total,
            queryParam,
            flexTableColumns
        }
    }
}

</script>

