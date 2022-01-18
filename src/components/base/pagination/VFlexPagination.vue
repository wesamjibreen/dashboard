<script>
    // import {withDefaults} from 'vue'
    // import {useRoute} from 'vue-router'
    // import {useI18n} from 'vue-i18n'

    export default {
        props: {
            paginator: {},
            resource: {
                required: false,
                default: null
            },
            maxLinksDisplayed: {
                default: 4
            }
        },
        methods: {
            paginatedLink(page = 1) {
                const _page = Math.min(page, this.lastPage);

                const query = {
                    ...this.$route.query,
                    // page: _page <= 1 ? undefined : _page,
                };
                query[this.pageKey] = _page;


                this.$router.push({query});
                this.$emit('handle-pagination', _page);

                // let route = Object.assign({}, this.$route);
                // let route = this.$route;
                // route.query.page = _page;
                // console.log('paginatedLink',this.$route, route);
                // return route;
                // return {
                //     name: this.$route.name,
                //     params: this.$route.params,
                //     query,
                // }
            }
        },

        computed: {
            hasPagination() {
                return this.lastPage > 1;
            },
            pageKey() {
                return this.resource ? `${this.resource}_page` : 'page';
            },
            currentPage() {
                return _.get(this, 'paginator.current_page', 1);
            },
            itemsPerPage() {
                return _.get(this, 'paginator.per_page', 10);
            },
            totalItems() {
                return _.get(this, 'paginator.total', 10);
            },
            lastPage() {
                return _.get(this, 'paginator.last_page', 1);
            },
            totalPageDisplayed() {
                return this.lastPage > this.maxLinksDisplayed - 2
                    ? this.maxLinksDisplayed - 2 : this.lastPage
            },
            pages() {
                const _pages = []
                let firstButton = this.currentPage - Math.floor(this.totalPageDisplayed / 2)
                let lastButton = firstButton + (this.totalPageDisplayed - Math.ceil(this.totalPageDisplayed % 2));

                if (firstButton < 1) {
                    firstButton = 1;
                    lastButton = firstButton + (this.totalPageDisplayed - 1)
                }

                if (lastButton > this.lastPage) {
                    lastButton = this.lastPage
                    firstButton = lastButton - (this.totalPageDisplayed - 1)
                }

                for (let page = firstButton; page <= lastButton; page += 1) {
                    if (page === firstButton || page === lastButton) {
                        continue
                    }
                    _pages.push(page)
                }
                return _pages

            },
            showFirstLink() {
                return this.pages[0] > 1
            },
            showLastLink() {
                return this.pages[this.pages.length - 1] < this.lastPage
            }
        },

    }


</script>

<i18n lang="yaml">
    de:
    goto-page-title: 'Gehe zu Seite {page}'
    en:
    goto-page-title: 'Goto page {page}'
    es-MX:
    goto-page-title: 'Ir a la página {page}'
    es:
    goto-page-title: 'Ir a la página {page}'
    fr:
    goto-page-title: 'Aller à la page {page}'
    zh-CN:
    goto-page-title: '转到第{page}页'
</i18n>

<template>
    <nav
            v-if="hasPagination"
            role="navigation"
            class="flex-pagination pagination is-rounded"
            aria-label="pagination"
            data-filter-hide
    >
        <a v-if="lastPage > 1"
           @click="paginatedLink(currentPage - 1)"
           class="pagination-previous has-chevron">
            <Icon icon="feather:chevron-left"/>
            <!--<i-->
            <!--aria-hidden="true"-->
            <!--class="iconify"-->
            <!--data-icon="feather:chevron-left"-->
            <!--&gt;</i>-->
        </a>
        <a
                v-if="lastPage > 1"
                @click="paginatedLink(currentPage + 1)"
                class="pagination-next has-chevron"
        >
            <Icon icon="feather:chevron-right"/>

            <!--<i-->
            <!--aria-hidden="true"-->
            <!--class="iconify"-->
            <!--data-icon="feather:chevron-right"-->
            <!--&gt;</i>-->
        </a>

        <ul class="pagination-list">
            <li>
                <a
                        @click="paginatedLink(1)"
                        class="pagination-link"
                        :aria-label="trans('goto-page-title', { page: 1 })"
                        :class="[currentPage === 1 && 'is-current']">
                    1
                </a>
            </li>

            <li v-if="pages.length === 0 || pages[0] > 2">
                <span class="pagination-ellipsis">…</span>
            </li>

            <li v-for="page in pages" :key="page">
                <a
                        @click="paginatedLink(page)"
                        class="pagination-link"
                        :aria-label="trans('goto-page-title', { page: page })"
                        :aria-current="currentPage === page ? 'page' : undefined"
                        :class="[currentPage === page && 'is-current']"
                >
                    {{ page }}
                </a>
            </li>

            <li v-if="pages[pages.length - 1] < lastPage - 1">
                <span class="pagination-ellipsis">…</span>
            </li>

            <li>
                <a @click="paginatedLink(lastPage)"
                   class="pagination-link"
                   :aria-label="trans('goto-page-title', { page: lastPage })"
                   :class="[currentPage === lastPage && 'is-current']">
                    {{ lastPage }}
                </a>
            </li>
        </ul>
    </nav>
</template>
