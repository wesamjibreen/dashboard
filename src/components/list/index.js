import {defineAsyncComponent} from "vue";

export default {
    ExpandableTable: defineAsyncComponent(() => import('./ExpandableTable.vue')),
    VList: defineAsyncComponent(() => import('./Index.vue')),
    ImageHolder: defineAsyncComponent(() => import('./partials/ImageHolder')),
}
