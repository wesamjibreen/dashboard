import {defineAsyncComponent} from "vue";

export default {
    VList: defineAsyncComponent(() => import('./Index.vue')),
    ImageHolder: defineAsyncComponent(() => import('./partials/ImageHolder')),
}