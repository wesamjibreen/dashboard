<template>
    <div class="bg-white w-full border rounded">
        <v-date-picker v-model="selected.date">
            <template #default="{ inputValue, togglePopover, hidePopover }">
                <div class="input flex flex-wrap">
                    <button
                            v-for="(date, i) in dates"
                            :key="date.toString()"
                            class="flex items-center bg-indigo-100 hover:bg-indigo-200 text-sm text-indigo-600 font-semibold h-8 px-2 m-1 rounded-lg border-2 border-transparent focus:border-indigo-600 focus:outline-none"
                            @click.stop.prevent="dateSelected($event, date, togglePopover)"
                            ref="button">
                        {{ this.formatDate(date) }}
                        <svg class="w-4 h-4 text-gray-600 hover:text-indigo-600 ml-1 -mr-1"
                             viewBox="0 0 24 24"
                             stroke="currentColor"
                             stroke-width="2" @click.stop.prevent="removeDate(date, hidePopover)">
                            <path d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>

                    <button
                            class="text-sm text-indigo-600 font-semibold hover:text-indigo-500 px-2 h-8 focus:outline-none"
                            @click.stop.prevent="addDate">
                        + Add Date
                    </button>
                </div>
            </template>
        </v-date-picker>

    </div>
</template>
<script>
    import {DatePicker} from "v-calendar";
    import input from "../mixins/input";
    import {useInputField} from "../composable/useInputField";

    export default {
        components: {
            "v-date-picker": DatePicker
        },
        mixins: [input],
        setup(props) {
            return {
                ...useInputField(props)
            };
        },
        data() {
            return {
                // dates: [
                //     {
                //         date: new Date(),
                //     },
                // ],
                selected: {},
            };
        },
        methods: {
            formatDate({date}){
                var d = new Date(date);

                return d.getFullYear() + "-" + (d.getMonth()+1)+ "-" + d.getDate()    ;
            },
            addDate() {
                this.dates = [...this.dates, {
                    date: new Date(),
                }];
                this.$nextTick(() => {
                    const btn = this.$refs.button?.[this.$refs.button?.length - 1];
                    btn.click();
                });
            },
            removeDate(date, hide) {
                this.dates = this.dates.filter((d) => d !== date);
                hide();
            },
            dateSelected(e, date, toggle) {
                this.selected = date;
                toggle({ref: e.target});
            },
            convert(dates) {
                return dates;
                // return _.map(dates, (date) => (date?.date ?? date));
            }
        },
        computed: {
            dates: {
                set(newVal) {
                    this.input = this.convert(newVal);
                },

                get() {
                    return this.inputValue instanceof Array ? this.convert(this.inputValue) : [
                        // {
                            // date: new Date(),
                        // },
                        // new Date()
                    ]
                }
            }
        }
    };
</script>
<style>
    .flex .items-center {
        background-color: var(--primary);
        color: white;
        display: flex;
        border: 1px solid;
        border-radius: 5px;
    }

    .flex .items-center svg {
        width: 20px !important;
    }

    button.text-sm.text-indigo-600.font-semibold.hover\:text-indigo-500.px-2.h-8.focus\:outline-none {
        background-color: var(--danger);
        border: 1px;
        color: white;
        border-radius: 5px;
    }
</style>
<!--<template>-->
<!--<v-calendar :attributes="attributes" @dayclick="onDayClick"/>-->
<!--</template>-->
<!--<script>-->
<!--import { vCalendar} from 'v-calendar';-->

<!--export default {-->
<!--components: {-->
<!--vCalendar-->
<!--},-->
<!--data() {-->
<!--return {-->
<!--days: [],-->
<!--};-->
<!--},-->
<!--computed: {-->
<!--dates() {-->
<!--return this.days.map(day => day.date);-->
<!--},-->
<!--attributes() {-->
<!--return this.dates.map(date => ({-->
<!--highlight: true,-->
<!--dates: date,-->
<!--}));-->
<!--},-->
<!--},-->
<!--methods: {-->
<!--onDayClick(day) {-->
<!--const idx = this.days.findIndex(d => d.id === day.id);-->
<!--if (idx >= 0) {-->
<!--this.days.splice(idx, 1);-->
<!--} else {-->
<!--this.days.push({-->
<!--id: day.id,-->
<!--date: day.date,-->
<!--});-->
<!--}-->
<!--},-->
<!--},-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--<div class="field-container">-->
<!--<v-date-picker v-model="input" :model-config="modelConfig" :mode="mode">-->
<!--<template v-if="!inline" #default="{ inputValue, inputEvents }">-->
<!--<input class="input"-->
<!--:class="{'is-invalid' : errorMessage && meta.touched}"-->
<!--type="text" :placeholder="placeholder$"-->
<!--:value="inputText" v-on="inputEvents"/>-->
<!--</template>-->
<!--</v-date-picker>-->
<!--<span class="invalid" v-if="errorMessage && meta.touched">-->
<!--{{ errorMessage }}-->
<!--</span>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import input from "../mixins/input";-->
<!--import {DatePicker} from 'v-calendar';-->
<!--import {useInputField} from "../composable/useInputField";-->

<!--export default {-->
<!--name: "MultipleDateField",-->
<!--mixins: [input],-->
<!--components: {-->
<!--"v-date-picker": DatePicker-->
<!--},-->
<!--props: {-->
<!--mode: {-->
<!--default: null-->
<!--},-->
<!--inline: {-->
<!--default: false-->
<!--}-->
<!--},-->
<!--data() {-->
<!--return {-->
<!--modelConfig: {-->
<!--type: 'string',-->
<!--mask: 'YYYY-MM-DD', // Uses 'iso' if missing-->
<!--},-->
<!--}-->
<!--},-->
<!--setup(props) {-->
<!--return {-->
<!--...useInputField(props)-->
<!--};-->
<!--},-->
<!--methods: {-->
<!--passingInput(newVal) {-->
<!--if (this.mode === "multiple")-->
<!--return newVal instanceof Array ? newVal : [newVal];-->
<!--return newVal;-->
<!--}-->
<!--},-->
<!--computed: {-->
<!--inputText() {-->
<!--if (this.input instanceof Array)-->
<!--return _.join(this.input, ',');-->

<!--return this.input;-->
<!--},-->

<!--}-->
<!--}-->
<!--</script>-->

<!--<style>-->

<!--</style>-->
