import FormLayout from "./FormLayout";
import Fieldset from "./Fieldset";
import fields from "./fields";
// import {defineAsyncComponent} from "vue";
export default {
    FormLayout,
    Fieldset,
    // Fieldset: defineAsyncComponent(() => import('./Fieldset')),
    // FormLayout: defineAsyncComponent(() => import('./FormLayout')),
    ...fields
}