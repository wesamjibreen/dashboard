import {defineAsyncComponent} from 'vue'

export default {
    AlertDialog: defineAsyncComponent(() => import('./AlertDialog.vue')),
}