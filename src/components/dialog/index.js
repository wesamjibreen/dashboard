import {defineAsyncComponent} from 'vue'

export default {
    AlertDialog: defineAsyncComponent(() => import('./AlertDialog.vue')),
    PopDialog: defineAsyncComponent(() => import('./PopDialog.vue')),

}