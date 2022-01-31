<template>
    <div class="field-container">
        <o-datepicker @update:modelValue="onChange"
                      :modelValue="computedInput"
                      class="input"
                      type="string"
                      :multiple="multiple"
                      :range="range"
                      icon="calendar"
                      :placeholder="placeholder$"
                      trap-focus>
        </o-datepicker>

        <!--:dateFormatter="dateFormatter"-->
        <!--:dateParser="dateParser"-->
        <!--:dateCreator="dateCreator"-->

        <span class="invalid" v-if="errorMessage && meta.touched">
            {{ errorMessage }}
        </span>
    </div>
</template>

<script>
    import input from "../mixins/input";
    import {useInputField} from "../composable/useInputField";

    export default {
        name: "DateField",
        mixins: [input],
        props: {
            inline: {
                default: false
            },
            multiple: {
                default: false
            },
            range: {
                default: false
            }
        },
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
            }
        },
        methods: {
            onChange(value) {
                if (this.isMultiple)
                    this.$commit(_.map(value ?? [], (date) => {
                        return this.dateParser(date);
                    }));
                else
                    this.$commit(this.dateParser(value));
            },
            dateCreator() {
                return new Date();
            },
            dateFormatter(date) {
                return (date || new Date()).toLocaleDateString('en-GB').split('/').reverse().join('-');
            },
            dateParser(date) {
                return (date || new Date()).toLocaleDateString('en-GB').split('/').reverse().join('-'); // '20211124'
            }
        },
        computed: {
            defaultValue() {
                return this.isMultiple ? [] : null;
            },
            computedInput() {
                if (this.isMultiple)
                    return _.map(this.input ?? [], (date) => {
                        return new Date(date);
                    });
                return this.input ? new Date(this.input) : null;
            },
            isMultiple() {
                return this.range || this.multiple
            }
        }
    }
</script>

