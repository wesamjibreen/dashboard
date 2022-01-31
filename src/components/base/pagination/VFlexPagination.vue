<template>
    <div class="--pagination">
        <o-pagination
                v-if="hasPagination"
                iconPack="fa"
                :total="totalItems"
                :current.sync="currentPage"
                @change="paginatedLink"
                order="centered"
                :rounded="true"
                :per-page="itemsPerPage"
                :range-before="3"
                :range-after="3"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page">

        </o-pagination>
    </div>
</template>

<script>
    import {useRoute} from "vue-router";

    export default {
        props: {
            paginator: Object,
            resource: String
        },
        methods: {
            paginatedLink(page = 1) {
                // const route = useRoute();
                console.log('paginatedLink', this.$route.query, this.queryParams);

                const query = this.queryParams ?? {};
                query[this.pageKey] = page;
                this.$router.push({query});
                this.$emit('handle-pagination', page);
            }
        },
        computed: {
            queryParams() {
                return Object.fromEntries(new URLSearchParams(window.location.search));
            },
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
                return _.get(this, 'paginator.total', 0);
            },
            lastPage() {
                return _.get(this, 'paginator.last_page', 1);
            },
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


<style>
    .--pagination {
        padding: 15px 5px;
    }
</style>