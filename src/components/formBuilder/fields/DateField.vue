<template>
    <div class="field-container">
        <v-date-picker v-model="input" :model-config="modelConfig">
            <template v-if="!inline" #default="{ inputValue, inputEvents }">
                <input class="input"
                       :class="{'is-invalid' : errorMessage && meta.touched}"
                       type="text"
                       :placeholder="placeholder$"
                       :value="input"
                       v-on="inputEvents"
                />
            </template>
        </v-date-picker>
        <span class="invalid" v-if="errorMessage && meta.touched">
            {{ errorMessage }}
        </span>
    </div>
</template>

<script>
    import input from "../mixins/input";
    import {DatePicker} from 'v-calendar';
    import {useInputField} from "../composable/useInputField";

    export default {
        name: "DateField",
        mixins: [input],
        components: {
            "v-date-picker": DatePicker
        },
        props: {
            inline: {
                default: false
            }
        },
        data() {
            return {
                modelConfig: {
                    type: 'string',
                    mask: 'YYYY-MM-DD', // Uses 'iso' if missing
                },
            }
        },
        setup(props) {
            return {
                ...useInputField(props)
            };
        },

    }
</script>

<style>

</style>
