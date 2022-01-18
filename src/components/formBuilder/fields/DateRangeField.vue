<template>
    <div class="field-container">
        <v-date-picker v-model="input"  is-range  :model-config="modelConfig">
            <template v-if="!inline" #default="{ inputValue, inputEvents }">
                <div class="columns v-calendar-combo mt-0">
                    <div class="column is-6 pt-0">
                        <VField>
                            <VControl icon="feather:calendar">
                                <input :placeholder="trans('from_date')"
                                       :value="input?.start"
                                       class="input form-datepicker"
                                       v-on="inputEvents?.start"/>


                            </VControl>
                        </VField>
                    </div>

                    <div class="column is-6 pt-0">
                        <VField>
                            <VControl icon="feather:calendar">
                                <input :placeholder="trans('to_date')"
                                       :value="input?.end"
                                       class="input form-datepicker"
                                       v-on="inputEvents?.end" />
                            </VControl>
                        </VField>
                    </div>
                </div>
            </template>
        </v-date-picker>



        <!--<VeeField v-model="date" :name="model$" v-slot="{ field  }">-->
            <!--&lt;!&ndash;<v-date-picker v-bind="field" color="green" trim-weeks>&ndash;&gt;-->
            <!--&lt;!&ndash;<template #default="{ inputValue, inputEvents }">&ndash;&gt;-->
            <!--&lt;!&ndash;<input :class="{'input' : true, 'is-invalid' : errorMessage && meta.touched}"&ndash;&gt;-->
            <!--&lt;!&ndash;type="text"&ndash;&gt;-->
            <!--&lt;!&ndash;:placeholder="placeholder$"&ndash;&gt;-->
            <!--&lt;!&ndash;:value="inputValue"&ndash;&gt;-->
            <!--&lt;!&ndash;v-on="inputEvents"&ndash;&gt;-->
            <!--&lt;!&ndash;/>&ndash;&gt;-->
            <!--&lt;!&ndash;</template>&ndash;&gt;-->
            <!--&lt;!&ndash;</v-date-picker>&ndash;&gt;-->

            <!--<v-date-picker v-bind="field" is-range color="green" :masks="masks" mode="date" trim-weeks>-->
                <!--<template #default="{ inputValue, inputEvents }">-->
                    <!--<div class="columns v-calendar-combo">-->
                        <!--<div class="column is-6">-->
                            <!--<VField>-->
                                <!--<VControl icon="feather:calendar">-->
                                    <!--<input :placeholder="trans('from_date')"-->
                                           <!--:value="input?.start"-->
                                           <!--class="input form-datepicker"-->
                                           <!--v-on="inputEvents.start"/>-->
                                <!--</VControl>-->
                            <!--</VField>-->
                        <!--</div>-->
                        <!--<div class="column is-6">-->
                            <!--<VField>-->
                                <!--<VControl icon="feather:calendar">-->
                                    <!--<input :placeholder="trans('to_date')"-->
                                           <!--:value="input?.end"-->
                                            <!--class="input form-datepicker"-->
                                            <!--v-on="inputEvents.end" />-->
                                <!--</VControl>-->
                            <!--</VField>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</template>-->
            <!--</v-date-picker>-->
            <!--&lt;!&ndash;v-model="input"&ndash;&gt;-->
        <!--</VeeField>-->


        <span class="invalid" v-if="errorMessage && meta.touched">
            {{ errorMessage }}
        </span>
    </div>


    <!--<input class="input"-->
    <!--v-model="input"-->
    <!--:placeholder="placeholder$"-->
    <!--:name="model$"-->
    <!--:type="type$"/>-->
</template>

<script>
    import input from "../mixins/input";
    import {DatePicker} from 'v-calendar';
    import {useInputField} from "../composable/useInputField";

    export default {
        name: "DateRangeField",
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
                // date: null,
                // masks: {
                //     input: 'YYYY-MM-DD',
                // },
            }
        },
        // computed: {
        //     date: {
        //         set(newVal) {
        //             this.input = {
        //                 start : this.formatDate(newVal?.start),
        //                 end : this.formatDate(newVal?.end),
        //             };
        //         },
        //         get() {
        //             console.log('dateeeee get', this.input,{
        //                 start : this.input?.start? new Date(this.input.start) : null,
        //                 end : this.input?.end? new Date(this.input.end) : null,
        //             })
        //             // return new Date(this.input);
        //             return {
        //                 start : this.input?.start? new Date(this.input.start) : null,
        //                 end : this.input?.end? new Date(this.input.end) : null,
        //             }
        //         }
        //     }
        // },
        components: {
            "v-date-picker": DatePicker
        }
    }
</script>

<style>

</style>
