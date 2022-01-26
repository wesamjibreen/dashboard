<template>
    <div class="bg-white w-full border rounded">
        <v-date-picker v-model="selected" :model-config="modelConfig">
            <template #default="{ inputValue, togglePopover, hidePopover }">
                <div class="input flex flex-wrap">
                    <button v-for="(date, i) in dates"
                            :key="`${date}_${i}`"
                            class="flex items-center bg-indigo-100 hover:bg-indigo-200 text-sm text-indigo-600 font-semibold h-8 px-2 m-1 rounded-lg border-2 border-transparent focus:border-indigo-600 focus:outline-none"
                            @click.stop.prevent="dateSelected($event, date,i, togglePopover)"
                            ref="button">
                        {{   date  }}
                        <svg class="w-4 h-4 text-gray-600 hover:text-indigo-600 ml-1 -mr-1"
                             viewBox="0 0 24 24"
                             stroke="currentColor"
                             stroke-width="2" @click.stop.prevent="removeDate(date, hidePopover)">
                            <path d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>

                    <button class="text-sm text-indigo-600 font-semibold hover:text-indigo-500 px-2 h-8 focus:outline-none"
                            @click.stop.prevent="addDate($event , togglePopover)">
                        {{ trans('add_date') }}
                        <i class="fa fa-plus"></i>
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
                modelConfig: {
                    type: 'string',
                    mask: 'YYYY-MM-DD', // Uses 'iso' if missing
                },
                // dates: [
                //     {
                //         date: new Date(),
                //     },
                // ],
                selected: null,
            };
        },
        methods: {
            formatDate(date) {
                let d = this.toDate(date);
                return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            },
            toDate(date = null){
              return date ? new Date(date) : new Date();
            },
            addDate() {
                this.dates = [...this.dates,   this.formatDate()];
                this.$nextTick(() => {
                    const btn = this.$refs.button?.[this.$refs.button?.length - 1];
                    btn.click();
                });
            },
            removeDate(date, hide) {
                this.dates = this.dates.filter((d) => d !== date);
                hide();
            },
            dateSelected(e, date,i, toggle) {
                this.selected = date;
                toggle({ref: e.target});
            },
            convert(dates) {
                return _.map(dates, (date) =>this.formatDate(date));
            }
        },
        watch :{
            selected(selected){
                this.dates[this.dates.length - 1 ] = selected;
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