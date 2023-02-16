<template>
    <div class="field-container">
        <!--<o-datepicker-->
        <!--@update:modelValue="onChange"-->
        <!--:modelValue="computedInput"-->
        <!--class="input"-->
        <!--type="string"-->
        <!--:multiple="multiple"-->
        <!--icon="calendar"-->
        <!--:placeholder="placeholder$"-->
        <!--trap-focus>-->
        <!--</o-datepicker>-->
        <!--<h1>fddffddf </h1>-->
        <a-range-picker   class="input"  format="YYYY-MM-DD" :placeholder="placeholder$" :value="computedInput"  @change="onDateChange" />
    </div>
</template>

<script>
import input from "../mixins/input";
import dayjs from "dayjs";
export default {
    mixins: [input],

    methods: {
        onDateChange(value,date) {
                this.$commit(_.map(date ?? [], (date) => {
                    return date ? date :null;
                }));
        },
        // dateCreator() {
        //     return new Date();
        // },
        // dateFormatter(date) {
        //     date = date || new Date(date);
        //     return date && date.hasOwnProperty('toLocaleDateString') ? date.toLocaleDateString('en-GB').split('/').reverse().join('-') : null;
        // },
        // dateParser(date) {
        //     // return date;
        //     date = new Date(date);
        //     return date ? date.toLocaleDateString('en-GB').split('/').reverse().join('-') : null;
        // }
    },
    computed: {

        computedInput() {
            return _.map(this.input ?? [], (date) => {
                return date? dayjs(date, 'YYYY-MM-DD'):null;
            });
        },

    }

}
</script>


<!--<template>-->
<!--<div class="field-container">-->
<!--<v-date-picker v-model="input"  is-range  :model-config="modelConfig">-->
<!--<template v-if="!inline" #default="{ inputValue, inputEvents }">-->
<!--<div class="columns v-calendar-combo mt-0">-->
<!--<div class="column is-6 pt-0">-->
<!--<VField>-->
<!--<VControl icon="feather:calendar">-->
<!--<input :placeholder="trans('from_date')"-->
<!--:value="input?.start"-->
<!--class="input form-datepicker"-->
<!--v-on="inputEvents?.start"/>-->


<!--</VControl>-->
<!--</VField>-->
<!--</div>-->

<!--<div class="column is-6 pt-0">-->
<!--<VField>-->
<!--<VControl icon="feather:calendar">-->
<!--<input :placeholder="trans('to_date')"-->
<!--:value="input?.end"-->
<!--class="input form-datepicker"-->
<!--v-on="inputEvents?.end" />-->
<!--</VControl>-->
<!--</VField>-->
<!--</div>-->
<!--</div>-->
<!--</template>-->
<!--</v-date-picker>-->


<!--&lt;!&ndash;<VeeField v-model="date" :name="model$" v-slot="{ field  }">&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;<v-date-picker v-bind="field" color="green" trim-weeks>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;<template #default="{ inputValue, inputEvents }">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;<input :class="{'input' : true, 'is-invalid' : errorMessage && meta.touched}"&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;type="text"&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;:placeholder="placeholder$"&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;:value="inputValue"&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;v-on="inputEvents"&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;/>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;</template>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;</v-date-picker>&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;<v-date-picker v-bind="field" is-range color="green" :masks="masks" mode="date" trim-weeks>&ndash;&gt;-->
<!--&lt;!&ndash;<template #default="{ inputValue, inputEvents }">&ndash;&gt;-->
<!--&lt;!&ndash;<div class="columns v-calendar-combo">&ndash;&gt;-->
<!--&lt;!&ndash;<div class="column is-6">&ndash;&gt;-->
<!--&lt;!&ndash;<VField>&ndash;&gt;-->
<!--&lt;!&ndash;<VControl icon="feather:calendar">&ndash;&gt;-->
<!--&lt;!&ndash;<input :placeholder="trans('from_date')"&ndash;&gt;-->
<!--&lt;!&ndash;:value="input?.start"&ndash;&gt;-->
<!--&lt;!&ndash;class="input form-datepicker"&ndash;&gt;-->
<!--&lt;!&ndash;v-on="inputEvents.start"/>&ndash;&gt;-->
<!--&lt;!&ndash;</VControl>&ndash;&gt;-->
<!--&lt;!&ndash;</VField>&ndash;&gt;-->
<!--&lt;!&ndash;</div>&ndash;&gt;-->
<!--&lt;!&ndash;<div class="column is-6">&ndash;&gt;-->
<!--&lt;!&ndash;<VField>&ndash;&gt;-->
<!--&lt;!&ndash;<VControl icon="feather:calendar">&ndash;&gt;-->
<!--&lt;!&ndash;<input :placeholder="trans('to_date')"&ndash;&gt;-->
<!--&lt;!&ndash;:value="input?.end"&ndash;&gt;-->
<!--&lt;!&ndash;class="input form-datepicker"&ndash;&gt;-->
<!--&lt;!&ndash;v-on="inputEvents.end" />&ndash;&gt;-->
<!--&lt;!&ndash;</VControl>&ndash;&gt;-->
<!--&lt;!&ndash;</VField>&ndash;&gt;-->
<!--&lt;!&ndash;</div>&ndash;&gt;-->
<!--&lt;!&ndash;</div>&ndash;&gt;-->
<!--&lt;!&ndash;</template>&ndash;&gt;-->
<!--&lt;!&ndash;</v-date-picker>&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;v-model="input"&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;</VeeField>&ndash;&gt;-->


<!--<span class="invalid" v-if="errorMessage && meta.touched">-->
<!--{{ errorMessage }}-->
<!--</span>-->
<!--</div>-->


<!--&lt;!&ndash;<input class="input"&ndash;&gt;-->
<!--&lt;!&ndash;v-model="input"&ndash;&gt;-->
<!--&lt;!&ndash;:placeholder="placeholder$"&ndash;&gt;-->
<!--&lt;!&ndash;:name="model$"&ndash;&gt;-->
<!--&lt;!&ndash;:type="type$"/>&ndash;&gt;-->
<!--</template>-->

<!--<script>-->
<!--import input from "../mixins/input";-->
<!--import {DatePicker} from 'v-calendar';-->
<!--import {useInputField} from "../composable/useInputField";-->

<!--export default {-->
<!--name: "DateRangeField",-->
<!--mixins: [input],-->
<!--setup(props) {-->
<!--return {-->
<!--...useInputField(props)-->
<!--};-->
<!--},-->
<!--data() {-->
<!--return {-->
<!--modelConfig: {-->
<!--type: 'string',-->
<!--mask: 'YYYY-MM-DD', // Uses 'iso' if missing-->
<!--},-->
<!--// date: null,-->
<!--// masks: {-->
<!--//     input: 'YYYY-MM-DD',-->
<!--// },-->
<!--}-->
<!--},-->
<!--// computed: {-->
<!--//     date: {-->
<!--//         set(newVal) {-->
<!--//             this.input = {-->
<!--//                 start : this.formatDate(newVal?.start),-->
<!--//                 end : this.formatDate(newVal?.end),-->
<!--//             };-->
<!--//         },-->
<!--//         get() {-->
<!--//             console.log('dateeeee get', this.input,{-->
<!--//                 start : this.input?.start? new Date(this.input.start) : null,-->
<!--//                 end : this.input?.end? new Date(this.input.end) : null,-->
<!--//             })-->
<!--//             // return new Date(this.input);-->
<!--//             return {-->
<!--//                 start : this.input?.start? new Date(this.input.start) : null,-->
<!--//                 end : this.input?.end? new Date(this.input.end) : null,-->
<!--//             }-->
<!--//         }-->
<!--//     }-->
<!--// },-->
<!--components: {-->
<!--"v-date-picker": DatePicker-->
<!--}-->
<!--}-->
<!--</script>-->

<!--<style>-->

<!--</style>-->
