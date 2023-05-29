<script>
// import type { RouteLocationOptions } from 'vue-router/auto'

import {useI18n} from 'vue-i18n'
import {useRoute, RouterLink} from "vue-router";
import {computed} from "vue";
import VFlex from "../flex/VFlex.vue";
import {Icon} from "@iconify/vue";

// export interface VFlexPaginationProps {
//   itemPerPage: number
//   totalItems: number
//   currentPage?: number
//   maxLinksDisplayed?: number
//   noRouter?: boolean
//   routerQueryKey?: string
// }
//
// export interface VFlexPaginationEmits {
//   (e: 'update:currentPage', currentPage: number): void
// }

export default {
    components: {
        RouterLink,
        VFlex,
        Icon
    },
    props: {
        totalItems: {
            type: Number,
        },
        itemPerPage: {
            type: Number,
            default: 10
        },
        currentPage: {
            type: Number,
            default: 1
        },
        maxLinksDisplayed: {
            type: Number,
            default: 4
        },
        useRouter: {
            type: Boolean,
            default: true
        },
        routerQueryKey: {
            required: false,
            type: String,
            default: 'page'
        },
    },
    emits: ["update:currentPage"],
    setup(props, context) {

        const {t} = useI18n()
        const route = useRoute()
        const lastPage = computed(() => Math.ceil(props.totalItems / props.itemPerPage) || 1)
        const totalPageDisplayed = computed(() => lastPage.value > props.maxLinksDisplayed + 2
                ? props.maxLinksDisplayed + 2 : lastPage.value
        )
        const pages = computed(() => {
            const _pages = []
            let firstButton = props.currentPage - Math.floor(totalPageDisplayed.value / 2)
            let lastButton =
                firstButton + (totalPageDisplayed.value - Math.ceil(totalPageDisplayed.value % 2))

            if (firstButton < 1) {
                firstButton = 1
                lastButton = firstButton + (totalPageDisplayed.value - 1)
            }

            if (lastButton > lastPage.value) {
                lastButton = lastPage.value
                firstButton = lastButton - (totalPageDisplayed.value - 1)
            }

            for (let page = firstButton; page <= lastButton; page += 1) {
                if (page === firstButton || page === lastButton) {
                    continue
                }

                _pages.push(page)
            }

            return _pages
        })

        const showLastLink = computed(() => lastPage.value > 1)

        const paginatedLink = (page = 1) => {
            if (props.noRouter) {
                return {}
            }

            const _page = Math.max(1, Math.min(page, lastPage.value))
            const query = {
                ...route.query,
            }

            if (props.routerQueryKey) {
                query[props.routerQueryKey] = _page <= 1 ? undefined : _page
            }

            return {
                name: route.name,
                params: route.params,
                query,
            }
        }
        const handleLinkClick = (e, page = 1) => {
            const _page = Math.max(1, Math.min(page, lastPage.value))
            context.emit('update:currentPage', _page)

            if (props.noRouter) {
                e.preventDefault()
                e.stopPropagation()

                return false
            }
        }

        return {
            t,
            route,
            lastPage,
            totalPageDisplayed,
            pages,
            showLastLink,
            paginatedLink,
            handleLinkClick,

            props,
            context
        }
    }
}
// const emits = defineEmits()
// const props = defineProps({
//     itemPerPage: 10,
//     currentPage: 1,
//     maxLinksDisplayed: 4,
//     useRouter: true,
//     routerQueryKey: 'page',
// });

</script>

<template>
    <VFlex role="navigation" class="flex-pagination pagination is-rounded"
           aria-label="pagination"
           justify-content="space-between">
        <ul class="pagination-list">
            <slot name="before-pagination"></slot>
            <li>
                <RouterLink
                    :to="paginatedLink(1)"
                    tabindex="0"
                    class="pagination-link"
                    :aria-label="t('components.v-flex-pagination.goto-page-title', { page: 1 })"
                    :class="[props.currentPage === 1 && 'is-current']"
                    @keydown.space.prevent="(e) => (e.target ).click()"
                    @click="(e) => handleLinkClick(e, 1)">
                    1
                </RouterLink>
            </li>

            <li v-if="showLastLink && (pages.length === 0 || pages[0] > 2)">
                <span class="pagination-ellipsis">…</span>
            </li>

            <li v-for="page in pages" :key="page">
                <RouterLink
                    :to="paginatedLink(page)"
                    tabindex="0"
                    class="pagination-link"
                    :aria-label="t('components.v-flex-pagination.goto-page-title', { page: page })"
                    :aria-current="props.currentPage === page ? 'page' : undefined"
                    :class="[props.currentPage === page && 'is-current']"
                    @keydown.space.prevent="(e) => (e.target ).click()"
                    @click="(e) => handleLinkClick(e, page)"
                >
                    {{ page }}
                </RouterLink>
            </li>

            <li v-if="showLastLink && pages[pages.length - 1] < lastPage - 1">
                <span class="pagination-ellipsis">…</span>
            </li>

            <li v-if="showLastLink">
                <RouterLink
                    :to="paginatedLink(lastPage)"
                    tabindex="0"
                    class="pagination-link"
                    :aria-label="t('components.v-flex-pagination.goto-page-title', { page: lastPage })"
                    :class="[props.currentPage === lastPage && 'is-current']"
                    @keydown.space.prevent="(e) => (e.target ).click()"
                    @click="(e) => handleLinkClick(e, lastPage)">
                    {{ lastPage }}
                </RouterLink>
            </li>
            <slot name="after-pagination"></slot>
        </ul>

        <slot name="before-navigation"></slot>
        <RouterLink
            :to="paginatedLink(props.currentPage - 1)"
            tabindex="0"
            class="pagination-previous has-chevron"
            @keydown.space.prevent="(e) => (e.target).click()"
            @click="(e) => handleLinkClick(e, props.currentPage - 1)"
        >
            <Icon
                aria-hidden="true"
                class="iconify rtl-hidden"
                icon="feather:chevron-left"
            ></Icon>
            <!--      <Icon-->
            <!--        aria-hidden="true"-->
            <!--        class="iconify ltr-hidden"-->
            <!--        icon="feather:chevron-right"-->
            <!--      ></Icon>-->
        </RouterLink>
        <RouterLink
            :to="paginatedLink(props.currentPage + 1)"
            tabindex="0"
            class="pagination-next has-chevron"
            @keydown.space.prevent="(e) => (e.target ).click()"
            @click="(e) => handleLinkClick(e, props.currentPage + 1)"
        >
            <Icon
                aria-hidden="true"
                class="iconify rtl-hidden"
                icon="feather:chevron-right"
            ></Icon>
            <!--      <Icon-->
            <!--        aria-hidden="true"-->
            <!--        class="iconify ltr-hidden"-->
            <!--        icon="feather:chevron-left"-->
            <!--      ></Icon>-->
        </RouterLink>
        <slot name="after-navigation"></slot>
    </VFlex>
</template>
